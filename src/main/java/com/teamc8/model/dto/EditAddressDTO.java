package com.teamc8.model.dto;

import lombok.Data;

@Data
public class EditAddressDTO {

    private int id;
    private String street;
    private String city;
    private String state;
    private String postalCode;
}
