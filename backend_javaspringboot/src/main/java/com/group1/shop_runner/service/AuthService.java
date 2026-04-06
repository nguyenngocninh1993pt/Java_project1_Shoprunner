package com.group1.shop_runner.service;

import com.group1.shop_runner.config.JwtUtil;
import com.group1.shop_runner.dto.auth.response.LoginResponse;
import com.group1.shop_runner.entity.User;
import com.group1.shop_runner.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Wrong password");
        }

        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().getName()
        );

        return new LoginResponse(
                token,
                user.getUsername(),
                user.getRole().getName()
        );
    }
}