package com.group1.shop_runner.exception;
import lombok.Data;
import lombok.Getter;
import org.springframework.http.HttpStatus;

public enum ErrorCode {

    PRODUCT_NOT_FOUND("3002", "Product not found", HttpStatus.NOT_FOUND),
    INVALID_INPUT("1000", "Invalid input", HttpStatus.BAD_REQUEST),
    INTERNAL_ERROR("9999", "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);

    private final String code;
    private final String message;
    private final HttpStatus status;

    ErrorCode(String code, String message, HttpStatus status) {
        this.code = code;
        this.message = message;
        this.status = status;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
