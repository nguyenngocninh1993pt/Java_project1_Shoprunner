package com.group1.shop_runner.service;

import com.group1.shop_runner.dto.cart.request.AddToCartRequest;
import com.group1.shop_runner.dto.cart.request.UpdateCartItemRequest;
import com.group1.shop_runner.dto.cart.response.CartItemResponse;
import com.group1.shop_runner.dto.cart.response.CartResponse;
import com.group1.shop_runner.entity.Cart;
import com.group1.shop_runner.entity.CartItem;
import com.group1.shop_runner.entity.ProductVariant;
import com.group1.shop_runner.entity.User;
import com.group1.shop_runner.shared.exception.AppException;
import com.group1.shop_runner.shared.exception.ErrorCode;
import com.group1.shop_runner.repository.CartItemRepository;
import com.group1.shop_runner.repository.CartRepository;
import com.group1.shop_runner.repository.ProductVariantRepository;
import com.group1.shop_runner.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductVariantRepository productVariantRepository;

    @Autowired
    private UserRepository userRepository;

    // =========================================================
    // API 1: GET /api/v1/cart/{userId}
    // Mục đích:
    // - Lấy giỏ hàng của user theo userId
    // - Nếu user chưa có cart thì tạo response rỗng
    // =========================================================
    @Transactional(readOnly = true)
    public CartResponse getCartByUserId(Long userId) {
        Cart cart = cartRepository.findByUserId(userId).orElse(null);

        if (cart == null) {
            return new CartResponse(
                    null,
                    userId,
                    0,
                    BigDecimal.ZERO,
                    List.of()
            );
        }

        List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());

        return mapToCartResponse(cart, cartItems);
    }

    // =========================================================
    // API 2: POST /api/v1/cart/items
    // Mục đích:
    // - Thêm sản phẩm vào giỏ
    // - Nếu user chưa có cart thì tạo cart mới
    // - Nếu variant đã tồn tại trong cart thì cộng quantity
    // =========================================================
    @Transactional
    public CartResponse addToCart(AddToCartRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        ProductVariant variant = productVariantRepository.findById(request.getProductVariantId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        Cart cart = cartRepository.findByUserId(user.getId()).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUser(user);
            newCart.setCreatedAt(LocalDateTime.now());
            newCart.setUpdatedAt(LocalDateTime.now());
            return cartRepository.save(newCart);
        });

        CartItem cartItem = cartItemRepository
                .findByCartIdAndProductVariantId(cart.getId(), variant.getId())
                .orElse(null);

        if (cartItem == null) {
            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProductVariant(variant);
            cartItem.setQuantity(request.getQuantity());
            cartItem.setCreatedAt(LocalDateTime.now());
            cartItem.setUpdatedAt(LocalDateTime.now());
        } else {
            cartItem.setQuantity(cartItem.getQuantity() + request.getQuantity());
            cartItem.setUpdatedAt(LocalDateTime.now());
        }

        cartItemRepository.save(cartItem);

        cart.setUpdatedAt(LocalDateTime.now());
        cartRepository.save(cart);

        List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());
        return mapToCartResponse(cart, cartItems);
    }

    // =========================================================
    // API 3: PUT /api/v1/cart/items/{cartItemId}
    // Mục đích:
    // - Cập nhật số lượng của 1 cart item
    // =========================================================
    @Transactional
    public CartResponse updateCartItemQuantity(Long cartItemId, UpdateCartItemRequest request) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new AppException(ErrorCode.CART_ITEM_NOT_FOUND));

        cartItem.setQuantity(request.getQuantity());
        cartItem.setUpdatedAt(LocalDateTime.now());
        cartItemRepository.save(cartItem);

        Cart cart = cartItem.getCart();
        cart.setUpdatedAt(LocalDateTime.now());
        cartRepository.save(cart);

        List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());
        return mapToCartResponse(cart, cartItems);
    }

    // =========================================================
    // API 4: DELETE /api/v1/cart/items/{cartItemId}
    // Mục đích:
    // - Xóa 1 item khỏi giỏ hàng
    // =========================================================
    @Transactional
    public CartResponse removeCartItem(Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new AppException(ErrorCode.CART_ITEM_NOT_FOUND));

        Cart cart = cartItem.getCart();
        cartItemRepository.delete(cartItem);

        cart.setUpdatedAt(LocalDateTime.now());
        cartRepository.save(cart);

        List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());
        return mapToCartResponse(cart, cartItems);
    }

    // =========================================================
    // API 5: DELETE /api/v1/cart/{userId}/clear
    // Mục đích:
    // - Xóa toàn bộ item trong giỏ hàng của user
    // =========================================================
    @Transactional
    public void clearCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));

        cartItemRepository.deleteByCartId(cart.getId());

        cart.setUpdatedAt(LocalDateTime.now());
        cartRepository.save(cart);
    }

    // =========================================================
    // MAPPER 1:
    // Chuyển Cart + List<CartItem> -> CartResponse
    // =========================================================
    private CartResponse mapToCartResponse(Cart cart, List<CartItem> cartItems) {
        List<CartItemResponse> itemResponses = cartItems.stream()
                .map(this::mapToCartItemResponse)
                .collect(Collectors.toList());

        int totalItems = cartItems.stream()
                .mapToInt(CartItem::getQuantity)
                .sum();

        BigDecimal totalAmount = cartItems.stream()
                .map(item -> item.getProductVariant().getPrice()
                        .multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);


        return new CartResponse(
                cart.getId(),
                cart.getUser() != null ? cart.getUser().getId() : null,
                totalItems,
                totalAmount,
                itemResponses
        );
    }

    // =========================================================
    // MAPPER 2:
    // Chuyển CartItem -> CartItemResponse
    // =========================================================
    private CartItemResponse mapToCartItemResponse(CartItem cartItem) {
        ProductVariant variant = cartItem.getProductVariant();

        BigDecimal lineTotal = variant.getPrice()
                .multiply(BigDecimal.valueOf(cartItem.getQuantity()));
        String imageUrl = variant.getProduct().getImages()
                .stream()
                .sorted(Comparator.comparingInt(img -> img.getPosition()))
                .findFirst()
                .map(img -> img.getImageUrl())
                .orElse(null);

        return new CartItemResponse(
                cartItem.getId(),
                variant.getId(),
                variant.getProduct().getId(),
                variant.getProduct().getName(),
                variant.getOption1Value(),
                variant.getOption2Value(),
                variant.getOption3Value(),
                variant.getPrice(),
                cartItem.getQuantity(),
                lineTotal,
                imageUrl
        );
    }
}