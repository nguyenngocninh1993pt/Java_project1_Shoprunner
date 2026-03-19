package com.group1.shop_runner.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username", length = 50, unique = true,nullable = false)
    private String username;

    @Column(name = "password", length = 255,nullable = false)
    private String password;

    @Column(name = "email", length = 255, unique = true,nullable = false)
    private String email;

    // FK role_id
    @ManyToOne
    @JoinColumn(name = "role_id",nullable = false)
    private Role role;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
