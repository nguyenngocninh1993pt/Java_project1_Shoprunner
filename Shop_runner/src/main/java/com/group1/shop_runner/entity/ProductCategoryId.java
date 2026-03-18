package com.group1.shop_runner.entity;

import java.io.Serializable;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductCategoryId implements Serializable {
    private Integer product;
    private Integer category;
}
