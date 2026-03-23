package com.group1.shop_runner.controller;

import com.group1.shop_runner.entity.CartItem;
import com.group1.shop_runner.entity.Order;
import com.group1.shop_runner.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cart")
public class CartContrller {

    @Autowired
    private CartService cartService;

    // 1. API: Add to cart
    @PostMapping("/add")
    public String addToCart(@RequestParam Long userId, @RequestParam Long variantId, @RequestParam Integer quantity){
        cartService.addToCart(userId, variantId, quantity);
        return "Add to cart successfully";
    }

    // 2. API: Get cart:
    @GetMapping
    public List<CartItem> getCart(@RequestParam Long userId){
        return cartService.getCartItems(userId);
    }

    // 3. API: Checkout:
    @PostMapping("/checkout")
    public Order checkout(@RequestParam Long userId){
        return cartService.checkout(userId);
    }

}
