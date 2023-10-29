package com.teamc8.model.request;

import lombok.Data;

import java.util.Date;

@Data
public class NewPaymentCardRequest {

    private String email;
    private String cardType;
    private Date expirationDate;
    private String cardNumber;
    private String nameOnCard;
    private int addressId;

}
