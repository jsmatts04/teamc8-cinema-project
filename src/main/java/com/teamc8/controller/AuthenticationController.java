package com.teamc8.controller;

import com.teamc8.model.User;
import com.teamc8.service.ConfirmationTokenService;
import com.teamc8.exception.UserNotActiveException;
import com.teamc8.model.request.AuthenticationRequest;
import com.teamc8.model.AuthenticationResponse;
import com.teamc8.model.request.RegisterRequest;
import com.teamc8.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/*
    Handles all endpoints regarding user registration and login.
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final ConfirmationTokenService confirmationTokenService;

    //register a new user
    @PostMapping(path = "/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    //authenticate a user
    @PostMapping(path = "/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request) {
        try {
            return ResponseEntity.ok(authenticationService.authenticate(request));
        } catch (UserNotActiveException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    //confirm a user
    @GetMapping(path = "/confirm")
    public String confirm(@RequestParam("token") String token) {
        return confirmationTokenService.confirmToken(token);
    }

    @GetMapping(path = "/resendConfirmation")
    public String resendConfirmationEmail(@RequestParam String email) {
        return authenticationService.sendConfirmationEmail(email);
    }

}
