package com.teamc8.model.request;

import lombok.Data;

@Data
public class EditUserRequest {

    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;

}
