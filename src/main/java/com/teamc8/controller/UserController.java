package com.teamc8.controller;

import com.teamc8.model.User;
import com.teamc8.model.projection.UserInfo;
import com.teamc8.model.request.EditUserPasswordRequest;
import com.teamc8.model.request.EditUserRequest;
import com.teamc8.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<UserInfo> getAllUsers() {
        return userService.getAllUsers();
    }

    //get user by id
    @GetMapping(path = "/{id}")
    public UserInfo getUserById(@PathVariable("id") int id) {
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

    @PutMapping(path = "/editProfile/changePassword")
    public User changePassword(@RequestBody EditUserPasswordRequest passwordRequest) {
        return userService.changeUserPassword(passwordRequest);
    }

    @GetMapping(path = "/forgotPassword")
    public String forgotPassword(@RequestParam String email) {
        userService.sendForgotPasswordEmail(email);
        return "email sent";
    }

    //delete user by id
    @DeleteMapping (path = "/delete")
    public void deleteUser(@RequestParam int id) {
        userService.deleteUser(id);
    }


}
