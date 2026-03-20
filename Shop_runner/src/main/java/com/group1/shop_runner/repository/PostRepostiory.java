package com.group1.shop_runner.repository;

import com.group1.shop_runner.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepostiory extends JpaRepository<Post,Long> {
}
