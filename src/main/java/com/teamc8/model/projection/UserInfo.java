package com.teamc8.model.projection;

import com.teamc8.model.UserStatus;
import com.teamc8.model.UserType;

public interface UserInfo {

    int getId();
    String getEmail();
    String getFirstName();
    String getLastName();
    UserStatus getUserStatus();
//    UserType getUserType();
    String getUserTypeType();
}
