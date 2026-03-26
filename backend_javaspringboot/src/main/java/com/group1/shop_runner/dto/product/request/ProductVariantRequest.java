package com.group1.shop_runner.dto.product.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductVariantRequest {
    @NotNull(message = "Information is required")
    private Long productId;

    @NotBlank(message = "Information is required")
    private String option1Value;

    @NotBlank(message = "Information is required")
    private String option2Value;

    @NotNull(message = "Information is required")
    private BigDecimal price;

    @NotNull(message = "Information is required")
    private Integer stock;

    public String getOption3Value() {
        return getOption3Value();
    }
}
