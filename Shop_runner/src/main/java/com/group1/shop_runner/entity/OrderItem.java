package com.group1.shop_runner.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // FK order_id
    @ManyToOne
    @JoinColumn(name = "order_id",nullable = false)
    private Order order;

    // FK product_variant_id
    @ManyToOne
    @JoinColumn(name = "product_variant_id",nullable = false)
    private ProductVariant productVariant;

    @Column(name = "quantity",nullable = false)
    @Min(1)
    private Integer quantity;

    @Column(name = "price",nullable = false)
    @Min(0)
    private BigDecimal price;
}
