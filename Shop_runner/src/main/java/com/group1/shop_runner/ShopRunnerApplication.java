package com.group1.shop_runner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class ShopRunnerApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(ShopRunnerApplication.class, args);
        Environment env = context.getEnvironment();
        System.out.println("URL: " + env.getProperty("spring.datasource.url"));
    }
}