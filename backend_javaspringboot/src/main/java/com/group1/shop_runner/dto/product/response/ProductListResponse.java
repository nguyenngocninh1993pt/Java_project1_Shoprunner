package com.group1.shop_runner.dto.product.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductListResponse {
    private Long id;
    private String name;
    private BigDecimal minPrice;
    private String image;

    public ProductListResponse(Long id, String name, BigDecimal bigDecimal, String s, String description)    {
    }
}
