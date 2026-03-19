package com.group1.shop_runner.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "product_category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@IdClass(ProductCategoryId.class)
public class ProductCategory {

    @Id
    @ManyToOne
    @JoinColumn(name = "product_id",nullable = false)
    private Product product;

    @Id
    @ManyToOne
    @JoinColumn(name = "category_id",nullable = false)
    private Category category;
}
