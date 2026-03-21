package com.group1.shop_runner.dto.product.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequest {
    // Tiếp nhận thông tin từ client gửi lên
    private String name;
    private String description;
}
