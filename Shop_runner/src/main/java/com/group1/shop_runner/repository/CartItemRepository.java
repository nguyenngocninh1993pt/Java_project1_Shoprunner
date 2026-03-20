package com.group1.shop_runner.repository;

import com.group1.shop_runner.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {
}
