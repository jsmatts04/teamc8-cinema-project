package com.teamc8.service;

import com.teamc8.exception.UserNotFoundException;
import com.teamc8.model.User;
import com.teamc8.model.projection.UserInfo;
import com.teamc8.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public List<UserInfo> getAllUsers() {
        return userRepository.findAllProjectedBy();
    }

    public UserInfo getUserById(int id) {
        return userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User by id " + id + " not found"));
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        if (userRepository.existsById(user.getId())) {
            return userRepository.save(user);
        }
        else throw new UserNotFoundException("There is no user by the id " + user.getId() + " to be updated");
    }

    public void deleteUser(int id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        }
        else throw new UserNotFoundException("User by id " + id + " cannot be deleted because it does not exist");
    }
}
