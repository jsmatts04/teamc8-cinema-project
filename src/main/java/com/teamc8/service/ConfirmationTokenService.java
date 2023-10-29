package com.teamc8.service;

import com.teamc8.model.ConfirmationToken;
import com.teamc8.model.User;
import com.teamc8.repository.ConfirmationTokenRepository;
import com.teamc8.service.UserService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ConfirmationTokenService {

    private final ConfirmationTokenRepository confirmationTokenRepository;
    private final UserService userService;

    // Create confirmation token
    public ConfirmationToken createNewToken(User user) {
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = ConfirmationToken.builder()
                .token(token)
                .timeCreatedAt(LocalDateTime.now())
                .timeExpiredAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        return confirmationTokenRepository.save(confirmationToken);
    }

    // Get confirmation token
    public Optional<ConfirmationToken> getToken(String token) {
        return confirmationTokenRepository.findByToken(token);
    }

    // Set confirmation
    public void setConfirmedAt(ConfirmationToken token) {
        token.setTimeConfirmedAt(LocalDateTime.now());
        confirmationTokenRepository.save(token);
    }

    // Check if token is expired
    public boolean isTokenExpired(ConfirmationToken confirmationToken) {
        return confirmationToken.getTimeExpiredAt().isBefore(LocalDateTime.now());
    }

    // Confirm token
    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = getToken(token)
                .orElseThrow(() -> new IllegalStateException("token not found"));

        if (confirmationToken.getTimeConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        if (isTokenExpired(confirmationToken)) {
            throw new IllegalStateException("token expired");
        }

        setConfirmedAt(confirmationToken);
        userService.makeUserActive(confirmationToken.getUser());
        return "confirmed";
    }

    // Get last token for user
    public ConfirmationToken getLastTokenForUser(User user) {
        return confirmationTokenRepository.findFirstByUserIdOrderByTimeCreatedAtDesc(user.getId());
    }
}
