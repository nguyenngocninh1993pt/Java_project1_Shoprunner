package com.group1.shop_runner.importdata.service;

import com.group1.shop_runner.importdata.dto.ApiProduct;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.group1.shop_runner.entity.*;
import com.group1.shop_runner.repository.*;


@Service
public class ProductImportService {

    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    private final ProductVariantRepository variantRepository;
    private final ProductImageRepository imageRepository;
    private final ProductCategoryImportService productCategoryImportService;

    public ProductImportService(ProductRepository productRepository,
                                BrandRepository brandRepository,
                                ProductVariantRepository variantRepository,
                                ProductImageRepository imageRepository, ProductCategoryImportService productCategoryImportService) {
        this.productRepository = productRepository;
        this.brandRepository = brandRepository;
        this.variantRepository = variantRepository;
        this.imageRepository = imageRepository;
        this.productCategoryImportService = productCategoryImportService;
    }

    @Transactional
    public void importProduct(ApiProduct apiProduct){

        //tránh duplicate theo slug
        if (productRepository.existsBySlug(apiProduct.getHandle())) {
            return;
        }

        //map brand
        Brand brand = brandRepository
                .findByName(apiProduct.getVendor())
                .orElse(null);

        //tạo product
        Product product = new Product();
        product.setName(apiProduct.getTitle());
        product.setSlug(apiProduct.getHandle());
        product.setDescription(apiProduct.getBodyHtml());
        product.setBrand(brand);

        // option name
        if (apiProduct.getOptions() != null) {
            if (apiProduct.getOptions().size() > 0)
                product.setOption1Name(apiProduct.getOptions().get(0).getName());
            if (apiProduct.getOptions().size() > 1)
                product.setOption2Name(apiProduct.getOptions().get(1).getName());
            if (apiProduct.getOptions().size() > 2)
                product.setOption3Name(apiProduct.getOptions().get(2).getName());
        }

        productRepository.save(product);
//        System.out.println("DEBUG: apiProduct.getProductType() = " + apiProduct.getProductType());

        //variants
        if (apiProduct.getVariants() != null) {
            apiProduct.getVariants().forEach(v -> {

                ProductVariant variant = new ProductVariant();
                variant.setProduct(product);

                variant.setOption1Value(v.getOption1());
                variant.setOption2Value(v.getOption2());
                variant.setOption3Value(v.getOption3());

                variant.setPrice(v.getPrice());
                variant.setComparePrice(v.getCompareAtPrice());
                Integer stock = v.getInventoryQuantity();
                if (stock == null || stock < 0) {
                    stock = 0;
                }
                variant.setStock(stock);
                variant.setSku(v.getSku());

                variantRepository.save(variant);
            });
        }


        //images
        if (apiProduct.getImages() != null) {
            apiProduct.getImages().forEach(img -> {

                ProductImage image = new ProductImage();
                image.setProduct(product);
                image.setImageUrl(img.getSrc());
                image.setPosition(img.getPosition());

                imageRepository.save(image);
            });
        }
        //category
        if (apiProduct.getProductType() != null && !apiProduct.getProductType().isBlank()) {
            productCategoryImportService.assignCategoryToProduct(product, apiProduct.getProductType());
        }
    }
}
