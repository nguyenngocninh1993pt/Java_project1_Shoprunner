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

    @Column(name = "name", length = 200,nullable = false)
    private String name;

    @Column(name = "slug", length = 300, unique = true,nullable = false)
    private String slug;

    @Column(name = "description")
    private String description;

    // FK brand_id
    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

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
