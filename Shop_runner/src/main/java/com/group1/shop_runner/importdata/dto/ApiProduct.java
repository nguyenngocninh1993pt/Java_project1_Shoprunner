package com.group1.shop_runner.importdata.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ApiProduct {
    private String title;
    private String handle;
    private String body_html;
    private String vendor;
    private List<ApiOption> options;
    private List<ApiVariant> variants;
    private List<ApiImage> images;
}
