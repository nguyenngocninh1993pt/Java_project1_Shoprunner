package com.group1.shop_runner.service;

import com.group1.shop_runner.entity.*;
import com.group1.shop_runner.exception.AppException;
import com.group1.shop_runner.exception.ErrorCode;
import com.group1.shop_runner.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductVariantRepository productVariantRepository;

    // 1. Service: User add item vào Cart:
    public void addToCart(Long userId, Long variantId, Integer quantity) {

        if (quantity <=0)
            throw new AppException(ErrorCode.INVALID_INPUT);

        // tìm cart
        Cart cart = cartRepository.findByUserId(userId) // tìm theo userid có thì lưu vào cart
                .orElseGet(() -> {  // không có thì tạo mới
                    Cart newCart = new Cart();
                    // set user vào đây
                    User user = new User();
                    user.setId(userId);
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });

        // tìm item trong cart
        Optional<CartItem> existingItem =
                cartItemRepository.findByCartIdAndProductVariantId(cart.getId(), variantId);
        if (existingItem.isPresent()) {

            // nếu đã có → cộng số lượng
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            cartItemRepository.save(item);

        } else {

            // nếu chưa có → tạo mới
            CartItem item = new CartItem();
            item.setCart(cart);

            ProductVariant variant = productVariantRepository.findById(variantId)
                    .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

            item.setProductVariant(variant);
            item.setQuantity(quantity);

            cartItemRepository.save(item);
        }
    }

    // 2. Lấy thông tin Cart: lấy CartItems bên trong cart đó:
    public List<CartItem> getCartItems(Long userId) {

        // tìm cart
        Optional<Cart> cartOpt = cartRepository.findByUserId(userId);

        // nếu chưa có cart → trả về rỗng
        if (cartOpt.isEmpty()) {
            return List.of(); // []
        }

        Cart cart = cartOpt.get();  // nếu có thì lấy cart đó ra = method get();

        // lấy list item
        return cartItemRepository.findByCartId(cart.getId());
    }

    // 3. Checkout cart:
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;
    public Order checkout(Long userId){
        // tìm cart:
        Cart cart = cartRepository.findByUserId(userId).orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));
        // lấy cart:
        List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());
        if (cartItems.isEmpty()){
            throw new AppException(ErrorCode.CART_IS_EMPTY);
        }
        // tạo order:
        Order order = new Order();
        User user = new User();
        user.setId(userId);
        order.setUser(user);
        BigDecimal total = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem: cartItems) {
            ProductVariant variant = productVariantRepository.findById(cartItem.getProductVariant().getId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

            // TODO: Check Stock:
            if (variant.getStock() < cartItem.getQuantity()) {
                throw new AppException(ErrorCode.OUT_OF_STOCK);
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProductVariant(variant);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(variant.getPrice());

            // tính tiền:
            BigDecimal itemTotal = variant.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity()));
            total = total.add(itemTotal);
            orderItems.add(orderItem);
        }
            order.setTotalPrice(total);
            Order savedOrder = orderRepository.save(order);
            orderItemRepository.saveAll(orderItems);

            // Clear cart:
            cartItemRepository.deleteAll(cartItems);
            return savedOrder;
    }
}
