package com.group1.shop_runner.repository;

import com.group1.shop_runner.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
    boolean existsBySlug(String slug);
}
