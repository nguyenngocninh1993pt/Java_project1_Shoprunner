package com.group1.shop_runner.importdata.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ApiProduct {
    private String title;
    private String handle;
    @JsonProperty("body_html")
    private String bodyHtml;
    private String vendor;
    @JsonProperty("product_type")
    private String productType;
    private List<ApiOption> options;
    private List<ApiVariant> variants;
    private List<ApiImage> images;
}
