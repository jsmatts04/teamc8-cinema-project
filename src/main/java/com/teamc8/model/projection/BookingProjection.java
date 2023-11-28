package com.teamc8.model.projection;

import com.teamc8.model.Promotion;
import com.teamc8.model.Showtime;

import java.time.LocalDate;
import java.util.Date;

public interface BookingProjection {

    int getId();
    String getUserEmail();
    Showtime getShowtime();
    String getPaymentCardLastFourDigits();
    Promotion getPromotion();
    float getTotal();
    LocalDate getDate();

}
