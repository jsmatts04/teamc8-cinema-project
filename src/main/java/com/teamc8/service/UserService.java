package com.teamc8.service;

import com.teamc8.config.JwtService;
import com.teamc8.config.email.EditProfileConfirmationEmailService;
import com.teamc8.config.email.EmailSender;
import com.teamc8.config.email.ForgotPasswordEmailService;
import com.teamc8.exception.UserAlreadyExistsException;
import com.teamc8.exception.UserNotFoundException;
import com.teamc8.model.ForgetPasswordToken;
import com.teamc8.model.User;
import com.teamc8.model.projection.UserInfo;
import com.teamc8.model.request.EditUserPasswordRequest;
import com.teamc8.model.request.EditUserRequest;
import com.teamc8.model.request.PasswordResetRequest;
import com.teamc8.repository.ForgetPasswordTokenRepository;
import com.teamc8.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserStatusService userStatusService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final ForgetPasswordTokenRepository tokenRepository;
    private final EmailSender forgotPasswordEmailService;
    private final EmailSender editProfileConfirmationEmailService;

    // Get all users
    public List<UserInfo> getAllUsers() {
        return userRepository.findAllProjectedBy();
    }

    //get user by id
    public UserInfo getUserById(int id) {
        return userRepository.findProjectedById(id).orElseThrow(
                () -> new UserNotFoundException("User by id " + id + " not found"));
    }

    // Create user
    public User createUser(User user) {
        // Check if user with email already exists
        if (userRepository.existsByEmail(user.getEmail()))
            throw new UserAlreadyExistsException("Username " + user.getEmail() + " already exists");
        return userRepository.save(user);
    }

    //edit user profile
    @Transactional
    public User editUser(EditUserRequest user) {
        User oldUser = userRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new UserNotFoundException("There is no user by the id " + user.getEmail() + " to be updated"));

        oldUser.setFirstName(user.getFirstName());
        oldUser.setLastName(user.getLastName());
        oldUser.setPhoneNumber(user.getPhoneNumber());
        oldUser.setPromotionEligibility(user.isPromotionEligibility());
        String emailContent = buildProfileEditNotificationEmail(oldUser.getFirstName());
        editProfileConfirmationEmailService.send(oldUser.getEmail(), emailContent);
        System.out.println("CHECKPOINT!!!");
        return oldUser;
    }

    //edit user password
    @Transactional
    public User changeUserPassword(EditUserPasswordRequest passwordRequest) {
        User oldUser = userRepository.findByEmail(passwordRequest.getEmail())
                .orElseThrow(() -> new UserNotFoundException("There is no user by the id " + passwordRequest.getEmail() + " to be updated"));

        // Check that provided current password is current
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        passwordRequest.getEmail(),
                        passwordRequest.getOldPassword()
                )
        );

        oldUser.setPassword(passwordEncoder.encode(passwordRequest.getNewPassword()));
        return oldUser;
    }

    public void sendForgotPasswordEmail(String email) {

        //Generate a unique token for resetting the password
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("There is no user by the email " + email + " to be found"));
        String token = UUID.randomUUID().toString();
        LocalDateTime now = LocalDateTime.now();
        ForgetPasswordToken forgetPasswordToken = new ForgetPasswordToken();
        forgetPasswordToken.setToken(token);
        forgetPasswordToken.setTimeCreatedAt(now);
        forgetPasswordToken.setTimeExpiredAt(now.plusMinutes(15));
        forgetPasswordToken.setUser(user);
        tokenRepository.save(forgetPasswordToken);

        //build the email and send it
        String resetLink = "http://localhost:3000/resetPassword?token=" + token;
        String emailContent = buildForgotPasswordEmail(user.getFirstName(), resetLink);
        forgotPasswordEmailService.send(email, emailContent);

    }

    public void resetPassword(String token, PasswordResetRequest passwordResetRequest) {
        // 1. Validate the token
        ForgetPasswordToken forgetPasswordToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalStateException("Token not found"));

        // 2. Check if the token has expired
        LocalDateTime now = LocalDateTime.now();
        if (forgetPasswordToken.getTimeExpiredAt().isBefore(now)) {
            throw new IllegalStateException("Token has expired");
        }

        // 3. Get the user associated with the token
        User user = forgetPasswordToken.getUser();

        // 4. Update the user's password
        String encodedPassword = passwordEncoder.encode(passwordResetRequest.getNewPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);

        // 5. Invalidate the token (by deleting it)
        tokenRepository.delete(forgetPasswordToken);
    }

    //make user active
    public void makeUserActive(User user) {
        user.setUserStatus(userStatusService.getUserStatusById((short) 1));
    }

    //delete user
    @Transactional
    public void deleteUser(String email) {
        if (userRepository.existsByEmail(email)) {
            userRepository.deleteByEmail(email);
        } else throw new UserNotFoundException("User by id " + email + " cannot be deleted because it does not exist");
    }

    //get user by email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User by email not found: " + email));
    }

    public UserInfo getUserInfoByEmail(String email) {
        return userRepository.findProjectedByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User by email not found: " + email));
    }

    public UserInfo getUserInfoByJwtToken(String token) {
        String email = jwtService.extractUsername(token);
        return getUserInfoByEmail(email);
    }

    private String buildForgotPasswordEmail(String name, String link) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">" +
                "<span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">" +
                "Reset Your Password</span>" +
                "<p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">" +
                "Hi " + name + "," +
                "</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">" +
                "We received a request to reset your password. Click on the below link to set a new password: " +
                "</p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\">" +
                "<p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">" +
                "<a href=\"" + link + "\">Reset Password</a>" +
                "</p></blockquote>\n If you didn't request a password reset, please ignore this email." +
                "</div>";
    }

    private String buildProfileEditNotificationEmail(String name) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">" +
                // ... (similar structure as your verification email) ...
                "<span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Profile Updated Successfully</span>" +
                // ... (similar structure as your verification email) ...
                "<p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Your profile has been successfully updated. If you didn't make these changes, please contact our support.</p>" +
                // ... (similar structure as your verification email) ...
                "</div>";
    }
}
