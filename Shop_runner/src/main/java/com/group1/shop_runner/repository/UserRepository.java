package com.group1.shop_runner.repository;

import com.group1.shop_runner.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
