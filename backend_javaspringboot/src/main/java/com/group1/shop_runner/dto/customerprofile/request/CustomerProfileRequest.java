package com.group1.shop_runner.dto.customerprofile.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CustomerProfileRequest {
    private Long userId;
    private String fullName;
    private String address;
    private LocalDate dob;
    private String phoneNumber;
    private String gender;
}