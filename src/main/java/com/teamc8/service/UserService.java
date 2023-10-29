package com.teamc8.service;

import com.teamc8.exception.UserAlreadyExistsException;
import com.teamc8.exception.UserNotFoundException;
import com.teamc8.model.User;
import com.teamc8.model.projection.UserInfo;
import com.teamc8.model.request.EditUserPasswordRequest;
import com.teamc8.model.request.EditUserRequest;
import com.teamc8.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserStatusService userStatusService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

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

        return oldUser;
    }

    //edit user password
    @Transactional
    public User resetUserPassword(EditUserPasswordRequest passwordRequest) {
        User oldUser = userRepository.findByEmail(passwordRequest.getEmail())
                .orElseThrow(() -> new UserNotFoundException("There is no user by the id " + passwordRequest.getEmail() + " to be updated"));

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        passwordRequest.getEmail(),
                        passwordRequest.getOldPassword()
                )
        );

        oldUser.setPassword(passwordEncoder.encode(passwordRequest.getNewPassword()));
        return oldUser;
    }

    //make user active
    public void makeUserActive(User user) {
        user.setUserStatus(userStatusService.getUserStatusById((short) 1));
    }

    //delete user
    public void deleteUser(int id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        }
        else throw new UserNotFoundException("User by id " + id + " cannot be deleted because it does not exist");
    }

    //get user by email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User by email not found: " + email));
    }
}
