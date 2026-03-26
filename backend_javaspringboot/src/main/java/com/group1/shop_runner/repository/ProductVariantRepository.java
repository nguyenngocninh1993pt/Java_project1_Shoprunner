package com.group1.shop_runner.repository;

import com.group1.shop_runner.dto.product.response.ProductVariantResponse;
import com.group1.shop_runner.entity.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductVariantRepository extends JpaRepository<ProductVariant, Long> {
    List<ProductVariant> findByProduct_Id(Long productId);

    List<ProductVariant> findByProductId(Long productId);
}
