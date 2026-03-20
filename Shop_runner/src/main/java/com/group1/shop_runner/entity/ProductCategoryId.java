package com.group1.shop_runner.entity;

import java.io.Serializable;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ProductCategoryId implements Serializable {
    private Long product;
    private Long category;
}
