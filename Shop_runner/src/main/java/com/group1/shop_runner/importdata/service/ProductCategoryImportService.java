package com.group1.shop_runner.importdata.service;

import com.group1.shop_runner.entity.Category;
import com.group1.shop_runner.entity.Product;
import com.group1.shop_runner.entity.ProductCategory;
import com.group1.shop_runner.repository.CategoryRepository;
import com.group1.shop_runner.repository.ProductCategoryRepository;
import com.group1.shop_runner.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductCategoryImportService {

    private final CategoryRepository categoryRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final ProductRepository productRepository;

    public ProductCategoryImportService(CategoryRepository categoryRepository,
                                        ProductCategoryRepository productCategoryRepository,
                                        ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productCategoryRepository = productCategoryRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public void assignCategoryToProduct(Product product, String categoryName) {
        if (categoryName == null || categoryName.isBlank()) return;

        Category category = categoryRepository.findByName(categoryName)
                .orElseGet(() -> {
                    Category newCategory = new Category();
                    newCategory.setName(categoryName);
                    newCategory.setDescription("");
                    return categoryRepository.save(newCategory);
                });

        boolean exists = productCategoryRepository.existsByProduct_IdAndCategory_Id(product.getId(), category.getId());
        if (!exists) {
            ProductCategory pc = new ProductCategory();
            pc.setProduct(product);
            pc.setCategory(category);
            productCategoryRepository.save(pc);
            productCategoryRepository.flush();
        }
    }
}