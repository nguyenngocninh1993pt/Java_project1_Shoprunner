package com.group1.shop_runner.repository;

import com.group1.shop_runner.entity.CustomerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerProfileRepository extends JpaRepository<CustomerProfile,Long> {
}
