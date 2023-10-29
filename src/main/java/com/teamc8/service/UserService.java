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

    //get user by id
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
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
