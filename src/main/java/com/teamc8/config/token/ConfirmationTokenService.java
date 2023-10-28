package com.teamc8.config.token;

import com.teamc8.model.User;
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

    public Optional<ConfirmationToken> getToken(String token) {
        return confirmationTokenRepository.findByToken(token);
    }

    public void setConfirmedAt(ConfirmationToken token) {
        token.setTimeConfirmedAt(LocalDateTime.now());
        confirmationTokenRepository.save(token);
    }

    public boolean isTokenExpired(ConfirmationToken confirmationToken) {
        return confirmationToken.getTimeExpiredAt().isBefore(LocalDateTime.now());
    }

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

    public ConfirmationToken getLastTokenForUser(User user) {
        return confirmationTokenRepository.findByUserIdOrderByTimeCreatedAtDesc(user.getId());
    }
}
