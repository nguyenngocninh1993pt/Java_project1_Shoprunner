package com.group1.shop_runner.importdata.dto;

import java.util.List;

public class ApiResponse {
    private List<ApiProduct> products;
    public List<ApiProduct> getProducts(){
        return products;
    }
    public void setProducts(List<ApiProduct> products){
        this.products = products;
    }

}
