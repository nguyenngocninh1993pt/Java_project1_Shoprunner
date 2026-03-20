package com.group1.shop_runner.repository;

import com.group1.shop_runner.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Long> {
}
