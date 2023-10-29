package com.teamc8.exception;

public class PaymentCardNotFoundException extends RuntimeException {
    public PaymentCardNotFoundException(String message) {
        super(message);
    }
}
