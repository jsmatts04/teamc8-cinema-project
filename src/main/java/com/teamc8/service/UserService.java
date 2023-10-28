package com.teamc8.service;

import com.teamc8.exception.UserAlreadyExistsException;
import com.teamc8.exception.UserNotFoundException;
import com.teamc8.model.RegisterRequest;
import com.teamc8.model.User;
import com.teamc8.model.UserStatus;
import com.teamc8.model.UserType;
import com.teamc8.model.projection.UserInfo;
import com.teamc8.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserStatusService userStatusService;
    private final PasswordEncoder passwordEncoder;
    private final UserTypeService userTypeService;

    public List<UserInfo> getAllUsers() {
        return userRepository.findAllProjectedBy();
    }

    public UserInfo getUserById(int id) {
        return userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User by id " + id + " not found"));
    }

    // Create user
    public User createUser(User user) {
        // Check if user with email already exists
        if (getUserByEmail(user.getEmail()).isPresent())
            throw new UserAlreadyExistsException("Username " + user.getEmail() + " already exists");
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        if (userRepository.existsById(user.getId())) {
            return userRepository.save(user);
        }
        else throw new UserNotFoundException("There is no user by the id " + user.getId() + " to be updated");
    }

    public void makeUserActive(User user) {
        user.setUserStatus(userStatusService.getUserStatusById((short) 1));
    }

    public void deleteUser(int id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        }
        else throw new UserNotFoundException("User by id " + id + " cannot be deleted because it does not exist");
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
