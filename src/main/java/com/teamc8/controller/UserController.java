package com.teamc8.controller;

import com.teamc8.model.User;
import com.teamc8.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/user/")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) { this.userService = userService; }

    @GetMapping
    public List<User> getAllUsers() {
        System.out.println("GET ALL USERS");
        return userService.getAllUsers();
    }

    @GetMapping(path = "{id}")
    public User getUserById(int id) {
        return userService.getUserById(id);
    }


    @PostMapping(path = "add")
    public User addUser(@RequestBody User user) {
        System.out.println("POST USER");
        return userService.addUser(user);
    }

    @PutMapping (path = "update")
    public User updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    //delete user by id
    @DeleteMapping (path = "delete")
    public void deleteUser(@RequestParam int id) {
        userService.deleteUser(id);
    }





}