package com.group1.shop_runner.dto.product.response;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductVariantResponse {
    private Long id;
    private String option1Value;
    private String option2Value;
    private BigDecimal price;
    private Integer stock;
}
