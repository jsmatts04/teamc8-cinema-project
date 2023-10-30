package com.teamc8.controller;

import com.teamc8.config.JwtService;
import com.teamc8.model.User;
import com.teamc8.model.dto.AllUserInfoDTO;
import com.teamc8.model.projection.UserInfo;
import com.teamc8.model.request.EditUserPasswordRequest;
import com.teamc8.model.request.EditUserRequest;
import com.teamc8.model.request.PasswordResetRequest;
import com.teamc8.service.GeneralService;
import com.teamc8.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/api/user")
public class UserController {

    private final UserService userService;
    private final GeneralService generalService;
    private final JwtService jwtService;

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

    @GetMapping(path = "/getByToken")
    public UserInfo getUserInfoByJwtToken(@RequestParam String token) {
        return userService.getUserInfoByJwtToken(token);
    }

    @GetMapping(path = "/getByEmail")
    public UserInfo getUserInfoByEmail(@RequestParam String email) {
        return userService.getUserInfoByEmail(email);
    }

    @GetMapping(path = "/getAllInfo")
    public AllUserInfoDTO getAllUserInfo(@RequestHeader("Authorization") String authHeader) {
        String jwtToken = jwtService.getTokenFromHeader(authHeader);
        String email = jwtService.extractUsername(jwtToken);
        return generalService.getAllUserInfoByEmail(email);
    }

    //add user
    @PostMapping(path = "/add")
    public User createUser(@RequestBody User user) {
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

    @PutMapping(path = "/resetPassword")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestBody PasswordResetRequest passwordResetRequest) {
        System.out.println("RESET PASSWORD!!");
        userService.resetPassword(token, passwordResetRequest);
        return ResponseEntity.ok("Password reset successfully");
    }

    //delete user by id
    @DeleteMapping (path = "/delete")
    public void deleteUser(@RequestParam String email) {
        userService.deleteUser(email);
    }


}
