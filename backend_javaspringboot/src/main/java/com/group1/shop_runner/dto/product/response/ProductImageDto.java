package com.group1.shop_runner.dto.product.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductImageDto {
    private Long productId;
    private String imageUrl;
    private int position;
    public ProductImageDto(Long productId, String imageUrl, Integer position) {
        this.productId = productId;
        this.imageUrl = imageUrl;
        this.position = position;
    }
}
