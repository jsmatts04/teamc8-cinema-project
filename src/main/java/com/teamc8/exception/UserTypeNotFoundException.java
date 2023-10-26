package com.teamc8.exception;

public class UserTypeNotFoundException extends RuntimeException {

    public UserTypeNotFoundException(String message) {
        super(message);
    }
}
