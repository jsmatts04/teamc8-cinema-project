package com.teamc8.service;

import com.teamc8.exception.UserStatusNotFoundException;
import com.teamc8.exception.UserTypeNotFoundException;
import com.teamc8.model.*;
import com.teamc8.repository.UserRepository;
import com.teamc8.repository.UserStatusRepository;
import com.teamc8.repository.UserTypeRepository;
import com.teamc8.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserTypeRepository userTypeRepository;
    private final UserStatusRepository userStatusRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        UserType customerType = userTypeRepository.findById((short) 2)
                .orElseThrow(() -> new UserTypeNotFoundException("Customer user type not found"));

        UserStatus inactiveStatus = userStatusRepository.findById((short) 2)
                .orElseThrow(() -> new UserStatusNotFoundException("Inactive user status not found"));

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .userStatus(inactiveStatus)
                .userType(customerType)
                .build();
        userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}
