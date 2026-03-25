package com.group1.shop_runner.service;

import com.group1.shop_runner.dto.product.request.ProductRequest;
import com.group1.shop_runner.dto.product.request.ProductVariantRequest;
import com.group1.shop_runner.dto.product.response.CategoryDto;
import com.group1.shop_runner.dto.product.response.ProductImageDto;
import com.group1.shop_runner.dto.product.response.ProductResponse;
import com.group1.shop_runner.dto.product.response.ProductVariantDto;
import com.group1.shop_runner.entity.Product;
import com.group1.shop_runner.entity.ProductVariant;
import com.group1.shop_runner.exception.AppException;
import com.group1.shop_runner.exception.ErrorCode;
import com.group1.shop_runner.repository.CategoryRepository;
import com.group1.shop_runner.repository.ProductImageRepository;
import com.group1.shop_runner.repository.ProductRepository;
import com.group1.shop_runner.repository.ProductVariantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductVariantRepository productVariantRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    // 1. Service: Lấy danh sách toàn bộ sản phẩm:
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    // 2. Service: Lấy 1 sản phầm theo id:
    public Product getProductById(Long id){
        return productRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
    }

    // 3. Service: Lấy Product details
    public List<ProductResponse> getAllProductDetail(int page) {

        Pageable pageable = PageRequest.of(page, 50); // 👈 fix cứng 50

        List<ProductResponse> products = productRepository.getProducts(pageable).getContent();

        List<Long> ids = products.stream()
                .map(ProductResponse::getId)
                .toList();

        var images = productImageRepository.getImagesByProductIds(ids);
        var variants = productVariantRepository.getVariantsByProductIds(ids);
        var categories = categoryRepository.getByProductIds(ids);

        Map<Long, List<ProductImageDto>> imageMap =
                images.stream().collect(Collectors.groupingBy(ProductImageDto::getProductId));

        Map<Long, List<ProductVariantDto>> variantMap =
                variants.stream().collect(Collectors.groupingBy(ProductVariantDto::getProductId));

        Map<Long, List<CategoryDto>> categoryMap =
                categories.stream().collect(Collectors.groupingBy(CategoryDto::getProductId));

        for (ProductResponse p : products) {
            p.setImages(imageMap.getOrDefault(p.getId(), List.of()));
            p.setVariants(variantMap.getOrDefault(p.getId(), List.of()));
            p.setCategories(categoryMap.getOrDefault(p.getId(), List.of()));
        }

        return products;
    }

    // 4. Service: Thêm sản phẩm từ client:
    public Product createProduct(ProductRequest request){
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        return productRepository.save(product);
    }

    // 5. Service: Thêm Variant từ client:
    public ProductVariant createVariant(ProductVariantRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException(
                        "Product not found with id = " + request.getProductId()
                ));
        ProductVariant variant = new ProductVariant();
        variant.setProduct(product);// set fk (product_id)
        variant.setOption1Value(request.getOption1Value());
        variant.setOption2Value(request.getOption2Value());
        variant.setPrice(request.getPrice());
        variant.setStock(request.getStock());
        return productVariantRepository.save(variant);
    }

    // 6. Service: Update Product
    public Product updateProduct(Long id, ProductRequest request){
        Product product = productRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        return productRepository.save(product);
    }

    // 7. Service: Update Variant
    public ProductVariant updateVariant(Long id, ProductVariantRequest request){
        ProductVariant variant = productVariantRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
    variant.setOption1Value(request.getOption1Value());
    variant.setOption2Value(request.getOption2Value());
    variant.setPrice(request.getPrice());
    variant.setStock(request.getStock());
    return productVariantRepository.save(variant);
    }

    // 8. Service: Delete product:
    public void deleteProduct(Long id){
        Product product = productRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        productRepository.delete(product);
    }

    // 9. Service: Delete variant:
    public void deleteVariant(Long id){
        ProductVariant variant = productVariantRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        productVariantRepository.delete(variant);
    }
}
