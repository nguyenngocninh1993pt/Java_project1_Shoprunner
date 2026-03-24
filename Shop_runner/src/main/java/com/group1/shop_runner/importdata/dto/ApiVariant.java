package com.group1.shop_runner.importdata.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonProperty("compared_price")
    private BigDecimal compareAtPrice;
    @JsonProperty("inventory_quantity")
    private Integer inventoryQuantity;
    private String sku;
}
