package com.group1.shop_runner.service;

import com.group1.shop_runner.dto.product.request.ProductRequest;
import com.group1.shop_runner.dto.product.request.ProductVariantRequest;
import com.group1.shop_runner.entity.Product;
import com.group1.shop_runner.entity.ProductVariant;
import com.group1.shop_runner.repository.ProductRepository;
import com.group1.shop_runner.repository.ProductVariantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductVariantRepository productVariantRepository;

    // Service: Lấy danh sách toàn bộ sản phẩm:
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    // Service: Lấy 1 sản phầm theo id:
    public Product getProductById(Long id){
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product is not found!"));
    }

    // Service: Lấy Variant theo Product:
    public List<ProductVariant> getVariantsByProduct(Long productId){
        return productVariantRepository.findByProductId(productId);
    }

    // Service: Thêm sản phẩm từ client:
    public Product createProduct(ProductRequest request){
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        return productRepository.save(product);
    }

    // Service: Thêm Variant từ client:
    public ProductVariant createVariant(ProductVariantRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException(
                        "Product not found with id = " + request.getProductId()
                ));
        ProductVariant variant = new ProductVariant();
        variant.setProduct(product);
        variant.setOption1Value(request.getOption1Value());
        variant.setOption2Value(request.getOption2Value());
        variant.setPrice(request.getPrice());
        variant.setStock(request.getStock());
        return productVariantRepository.save(variant);
    }

    // Service: Update Product
    public Product updateProduct(Long id, ProductRequest request){
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product is not found"));
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        return productRepository.save(product);
    }

    // Service: Update Variant
    public ProductVariant updateVariant(Long id, ProductVariantRequest request){
        ProductVariant variant = productVariantRepository.findById(id).orElseThrow(() -> new RuntimeException("Variant is not found"));
    variant.setOption1Value(request.getOption1Value());
    variant.setOption2Value(request.getOption2Value());
    variant.setPrice(request.getPrice());
    variant.setStock(request.getStock());
    return productVariantRepository.save(variant);
    }

    // Service: Delete product:
    public void deleteProduct(Long id){
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product is not found"));
        productRepository.delete(product);
    }

    // Service: Delete variant:
    public void deleteVariant(Long id){
        ProductVariant variant = productVariantRepository.findById(id).orElseThrow(() -> new RuntimeException("Variant is not found"));
        productVariantRepository.delete(variant);
    }
}
