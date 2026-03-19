package com.group1.shop_runner.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "product_variants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // FK product_id
    @ManyToOne
    @JoinColumn(name = "product_id",nullable = false)
    private Product product;

    @Column(name = "option1_value", length = 50)
    private String option1Value;

    @Column(name = "option2_value", length = 50)
    private String option2Value;

    @Column(name = "option3_value", length = 50)
    private String option3Value;

    @Column(name = "price",nullable = false)
    @Min(0)
    private BigDecimal price;

    @Column(name = "compare_price",nullable = false)
    @Min(0)
    private BigDecimal comparePrice;

    @Column(name = "stock",nullable = false)
    @Min(0)
    private Integer stock;

    @Column(length = 100)
    private String sku;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
