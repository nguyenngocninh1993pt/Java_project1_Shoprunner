package com.group1.shop_runner.importdata.runner;

import com.group1.shop_runner.importdata.dto.ApiProduct;
import com.group1.shop_runner.importdata.dto.ApiResponse;
import com.group1.shop_runner.importdata.service.ProductImportService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class ImportRunner implements CommandLineRunner {
    private final ProductImportService importService;
    private final RestTemplate restTemplate;

    public ImportRunner(ProductImportService importService, RestTemplate restTemplate) {
        this.importService = importService;
        this.restTemplate = restTemplate;
    }

    @Override
    public void run(String... args) throws Exception {
        for (int page = 1; page <= 34; page++) {
            String url = "https://www.thegioichaybo.vn/collections/all/products.json?page=" + page;
            try {
                ApiResponse response = restTemplate.getForObject(url, ApiResponse.class);
                if (response == null || response.getProducts() == null) {
                    System.out.println("Khong thay data tu api, page: " + page);
                    continue;
                }

                List<ApiProduct> products = response.getProducts();
                System.out.println("Page " + page + " - Lay duoc " + products.size() + " san pham");

                for (ApiProduct p : products) {
                    try {
                        importService.importProduct(p);
                        System.out.println("Imported: " + p.getTitle() +
                                " | Category: " + p.getProductType());
                    } catch (Exception e) {
                        System.out.println("Failed: " + p.getTitle());
                        e.printStackTrace();
                    }
                }
            } catch (Exception e) {
                System.out.println("Api call failed, page: " + page);
                e.printStackTrace();
            }
        }

        System.out.println("Het import tat ca page tu 1 den 34");
    }
}