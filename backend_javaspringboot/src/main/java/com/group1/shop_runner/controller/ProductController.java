package com.group1.shop_runner.controller;

import com.group1.shop_runner.dto.product.request.ProductRequest;
import com.group1.shop_runner.dto.product.request.ProductVariantRequest;
import com.group1.shop_runner.entity.Product;
import com.group1.shop_runner.entity.ProductVariant;
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
    // Lấy toàn bộ danh sách sản phẩm:
    @GetMapping
    public List<Product> getAll(){
        return productService.getAllProducts();
    }

    // Lấy 1 sản phẩm theo id:
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id){
        return productService.getProductById(id);
    }

    // Lấy Variant theo Product:
    @GetMapping("/{id}/variants")
    public List<ProductVariant> getVariantsByProduct(@PathVariable Long id){
        return productService.getVariantsByProduct(id);
    }

    // Thêm 1 Product từ client:
    @PostMapping
    public Product createProduct(@Valid @RequestBody ProductRequest request){
        return productService.createProduct(request);
    }

    // Thêm Variants từ client:
    @PostMapping("/variants")
    public ProductVariant createVariant(@Valid @RequestBody ProductVariantRequest request) {
        return productService.createVariant(request);
    }

    // Update product:
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @Valid @RequestBody ProductRequest request){
        return productService.updateProduct(id, request);
    }

    // Update variant:
    @PutMapping("/variants/{id}")
    public ProductVariant updateVariant(@PathVariable Long id,
                                        @Valid @RequestBody ProductVariantRequest request){
        return productService.updateVariant(id, request);
    }

    // Delete product:
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);
        return "Deleted product successfully";
    }

    // Delete variant:
    @DeleteMapping("/variants/{id}")
    public String deleteVariant(@PathVariable Long id){
        productService.deleteVariant(id);
        return "Delete variant successfully";
    }
}

