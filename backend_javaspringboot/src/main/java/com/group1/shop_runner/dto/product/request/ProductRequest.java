package com.group1.shop_runner.dto.product.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequest {
    // Tiếp nhận thông tin từ client gửi lên
    @NotBlank(message = "Name is required")
    private String name;
    private String description;
}
