package com.group1.shop_runner.importdata.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
public class ApiVariant {
    private String option1;
    private String option2;
    private String option3;

    private BigDecimal price;
    private BigDecimal compared_price;
    private Integer inventory_quantity;
    private String sku;
}
