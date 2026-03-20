package com.group1.shop_runner.importdata.service;

import com.group1.shop_runner.importdata.dto.ApiProduct;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductImportService {
    @Transactional
    public void importProduct(ApiProduct apiProduct){

    }
}
