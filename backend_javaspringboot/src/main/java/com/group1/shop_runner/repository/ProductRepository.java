package com.group1.shop_runner.repository;

import com.group1.shop_runner.dto.product.response.ProductResponse;
import com.group1.shop_runner.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findBySlug(String slug);
    List<ProductResponse> getProductsByIds(List<Long> ids);

    @Query("""
                SELECT new com.group1.shop_runner.dto.product.response.ProductResponse(
                    p.id,
                    p.name,
                    p.slug,
                    p.description,
                    b.name,
                    p.option1Name,
                    p.option2Name,
                    p.option3Name
                )
                FROM Product p
                LEFT JOIN p.brand b
            """)
    Page<ProductResponse> getProducts(Pageable pageable);
}
