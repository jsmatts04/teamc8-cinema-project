package com.teamc8.controller;

import com.teamc8.model.User;
import com.teamc8.model.projection.UserInfo;
import com.teamc8.model.request.EditUserPasswordRequest;
import com.teamc8.model.request.EditUserRequest;
import com.teamc8.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/user")
public class UserController {

    private final UserService userService;

    //constructor
    @Autowired
    public UserController(UserService userService) { this.userService = userService; }

    //get all users
    @GetMapping
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public List<UserInfo> getAllUsers() {
        return userService.getAllUsers();
    }

    //get user by id
    @GetMapping(path = "/{id}")
    public UserInfo getUserById(int id) {
        return userService.getUserById(id);
    }


    //add user
    @PostMapping(path = "/add")
    public User addUser(@RequestBody User user) {
        System.out.println("POST USER");
        return userService.createUser(user);
    }

    //update user
    @PutMapping(path = "/editProfile")
    public User editUser(@RequestBody EditUserRequest user) {
        return userService.editUser(user);
    }

    @PutMapping(path = "/editProfile/resetPassword")
    public User resetPassword(@RequestBody EditUserPasswordRequest passwordRequest) {
        return userService.resetUserPassword(passwordRequest);
    }

    //delete user by id
    @DeleteMapping (path = "/delete")
    public void deleteUser(@RequestParam int id) {
        userService.deleteUser(id);
    }





}
