package com.teamc8.exception;

public class ShowtimeAlreadyScheduledException extends RuntimeException {
    public ShowtimeAlreadyScheduledException(String message) {
        super(message);
    }
}
