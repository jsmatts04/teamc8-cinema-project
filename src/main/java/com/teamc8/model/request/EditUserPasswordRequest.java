package com.teamc8.model.request;

import lombok.Data;

@Data
public class EditUserPasswordRequest {

    private String email;
    private String oldPassword;
    private String newPassword;

}
