package com.teamc8.model.request;

import lombok.Data;

@Data
public class EditPaymentCardRequest {

    private int id;
    private String cardType;
    private String expirationDate;
    private String cardNumber;
    private String nameOnCard;

}
