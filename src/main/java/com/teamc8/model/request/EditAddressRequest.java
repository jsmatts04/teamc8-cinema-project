package com.teamc8.model.request;

import lombok.Data;

@Data
public class EditAddressRequest {

    private int id;
    private String street;
    private String city;
    private String state;
    private String postalCode;
}
