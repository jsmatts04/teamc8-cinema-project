package com.teamc8.exception;

public class PromotionNotValidException extends RuntimeException {
    public PromotionNotValidException(String code) {
        super("Promotion with code not valid: " + code);
    }
}
