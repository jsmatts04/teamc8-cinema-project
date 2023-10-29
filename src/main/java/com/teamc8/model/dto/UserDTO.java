package com.teamc8.model.dto;

import com.teamc8.model.User;
import lombok.Data;

@Data
public class UserDTO {

    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String userType;
    private String userStatus;
    private boolean promotionEligibility;

    public UserDTO(User user) {
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.phoneNumber = user.getPhoneNumber();
        this.userType = user.getUserType().getType();
        this.userStatus = user.getUserStatus().getStatus();
    }

}
