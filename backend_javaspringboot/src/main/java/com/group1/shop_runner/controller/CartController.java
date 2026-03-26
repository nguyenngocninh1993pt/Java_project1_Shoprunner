package com.group1.shop_runner.controller;

import com.group1.shop_runner.dto.cart.request.AddToCartRequest;
import com.group1.shop_runner.dto.cart.request.UpdateCartItemRequest;
import com.group1.shop_runner.dto.cart.response.CartResponse;
import com.group1.shop_runner.service.CartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // =========================================================
    // API 1: GET /api/v1/cart/{userId}
    // Mục đích:
    // - Xem giỏ hàng của user
    // =========================================================
    @GetMapping("/{userId}")
    public CartResponse getCartByUserId(@PathVariable Long userId) {
        return cartService.getCartByUserId(userId);
    }

    // =========================================================
    // API 2: POST /api/v1/cart/items
    // Mục đích:
    // - Thêm sản phẩm vào giỏ hàng
    // =========================================================
    @PostMapping("/items")
    public CartResponse addToCart(@Valid @RequestBody AddToCartRequest request) {
        return cartService.addToCart(request);
    }

    // =========================================================
    // API 3: PUT /api/v1/cart/items/{cartItemId}
    // Mục đích:
    // - Cập nhật số lượng cart item
    // =========================================================
    @PutMapping("/items/{cartItemId}")
    public CartResponse updateCartItemQuantity(@PathVariable Long cartItemId,
                                               @Valid @RequestBody UpdateCartItemRequest request) {
        return cartService.updateCartItemQuantity(cartItemId, request);
    }

    // =========================================================
    // API 4: DELETE /api/v1/cart/items/{cartItemId}
    // Mục đích:
    // - Xóa 1 cart item khỏi giỏ hàng
    // =========================================================
    @DeleteMapping("/items/{cartItemId}")
    public CartResponse removeCartItem(@PathVariable Long cartItemId) {
        return cartService.removeCartItem(cartItemId);
    }

    // =========================================================
    // API 5: DELETE /api/v1/cart/{userId}/clear
    // Mục đích:
    // - Xóa toàn bộ giỏ hàng của user
    // =========================================================
    @DeleteMapping("/{userId}/clear")
    public String clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return "Clear cart successfully";
    }
}