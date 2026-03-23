package com.group1.shop_runner.repository;

import com.group1.shop_runner.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {
}
