package com.teamc8.model.projection;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.teamc8.model.UserStatus;
import com.teamc8.model.UserType;

public interface UserInfo {

    int getId();
    String getEmail();
    String getFirstName();
    String getLastName();
    @JsonProperty("userStatus")
    String getUserStatusStatus();
    @JsonProperty("userType")
    String getUserTypeType();

    boolean getPromotionEligibility();
}
