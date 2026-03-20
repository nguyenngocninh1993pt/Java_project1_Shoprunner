package com.group1.shop_runner.repository;

import com.group1.shop_runner.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment,Long> {
}
