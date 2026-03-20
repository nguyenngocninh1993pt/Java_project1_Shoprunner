package com.group1.shop_runner.repository;

import com.group1.shop_runner.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart,Long> {
}
