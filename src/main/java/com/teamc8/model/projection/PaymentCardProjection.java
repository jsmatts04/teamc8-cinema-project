package com.teamc8.model.projection;

public interface PaymentCardProjection {
    int getId();
    int getUserId();
    String getNameOnCard();
    String getCardNumber();
    String getCardType();
    String getLastFourDigits();
    String getExpirationDate();

}
