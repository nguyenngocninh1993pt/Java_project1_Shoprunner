package com.group1.shop_runner.dto.product.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductVariantRequest {
    private Long productId;
    private String option1Value;
    private String option2Value;
    private BigDecimal price;
    private Integer stock;
}
