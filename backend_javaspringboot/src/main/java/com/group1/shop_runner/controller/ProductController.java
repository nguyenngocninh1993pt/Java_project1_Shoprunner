package com.group1.shop_runner.controller;

import com.group1.shop_runner.dto.product.request.ProductRequest;
import com.group1.shop_runner.dto.product.request.ProductVariantRequest;
import com.group1.shop_runner.dto.product.response.ProductDetailResponse;
import com.group1.shop_runner.dto.product.response.ProductListResponse;
import com.group1.shop_runner.dto.product.response.ProductVariantResponse;
import com.group1.shop_runner.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // =========================================================
    // API 1: GET /api/v1/products
    // Mục đích:
    // - Lấy danh sách tất cả sản phẩm
    // - Dùng cho trang danh sách sản phẩm ngoài frontend
    // =========================================================
    @GetMapping
    public List<ProductListResponse> getAllProducts() {
        return productService.getAllProducts();
    }

    // =========================================================
    // API 2: GET /api/v1/products/{id}
    // Mục đích:
    // - Lấy chi tiết 1 sản phẩm theo id
    // - Dùng cho trang product detail
    // =========================================================
    @GetMapping("/{id}")
    public ProductDetailResponse getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // =========================================================
    // API 3: GET /api/v1/products/{id}/variants
    // Mục đích:
    // - Lấy danh sách variant của 1 sản phẩm
    // - Dùng khi frontend muốn load riêng danh sách variant
    // =========================================================
    @GetMapping("/{id}/variants")
    public List<ProductVariantResponse> getVariantsByProduct(@PathVariable Long id) {
        return productService.getVariantsByProduct(id);
    }

    // =========================================================
    // API 4: POST /api/v1/products
    // Mục đích:
    // - Tạo mới 1 sản phẩm
    // - Request body: ProductRequest
    // =========================================================
    @PostMapping
    public ProductDetailResponse createProduct(@Valid @RequestBody ProductRequest request) {
        return productService.createProduct(request);
    }

    // =========================================================
    // API 5: POST /api/v1/products/variants
    // Mục đích:
    // - Tạo mới 1 variant cho product
    // - Request body: ProductVariantRequest
    // =========================================================
    @PostMapping("/variants")
    public ProductVariantResponse createVariant(@Valid @RequestBody ProductVariantRequest request) {
        return productService.createVariant(request);
    }

    // =========================================================
    // API 6: PUT /api/v1/products/{id}
    // Mục đích:
    // - Cập nhật thông tin product theo id
    // - Request body: ProductRequest
    // =========================================================
    @PutMapping("/{id}")
    public ProductDetailResponse updateProduct(@PathVariable Long id,
                                               @Valid @RequestBody ProductRequest request) {
        return productService.updateProduct(id, request);
    }

    // =========================================================
    // API 7: PUT /api/v1/products/variants/{id}
    // Mục đích:
    // - Cập nhật thông tin variant theo id
    // - Request body: ProductVariantRequest
    // =========================================================
    @PutMapping("/variants/{id}")
    public ProductVariantResponse updateVariant(@PathVariable Long id,
                                                @Valid @RequestBody ProductVariantRequest request) {
        return productService.updateVariant(id, request);
    }

    // =========================================================
    // API 8: DELETE /api/v1/products/{id}
    // Mục đích:
    // - Xóa product theo id
    // =========================================================
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return "Delete product successfully";
    }

    // =========================================================
    // API 9: DELETE /api/v1/products/variants/{id}
    // Mục đích:
    // - Xóa variant theo id
    // =========================================================
    @DeleteMapping("/variants/{id}")
    public String deleteVariant(@PathVariable Long id) {
        productService.deleteVariant(id);
        return "Delete variant successfully";
    }
}