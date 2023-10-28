package com.teamc8.exception;

public class UserStatusNotFoundException extends RuntimeException {
    public UserStatusNotFoundException(String message) {
        super(message);
    }
}
