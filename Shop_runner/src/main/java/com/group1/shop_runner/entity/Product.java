package com.group1.shop_runner.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", length = 200)
    private String name;

    @Column(name = "slug", length = 300, unique = true)
    private String slug;

    @Column(name = "description")
    private String description;

    // FK brand_id
    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    // FK discount_id (bảng này chưa tạo entity → tạm để Integer)
    @Column(name = "discount_id")
    private Integer discountId; // tạm để Integer

    @Column(name = "option1_name", length = 50)
    private String option1Name;

    @Column(name = "option2_name", length = 50)
    private String option2Name;

    @Column(name = "option3_name", length = 50)
    private String option3Name;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
