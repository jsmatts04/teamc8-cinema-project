package com.teamc8.model.request;

import com.teamc8.model.Promotion;
import com.teamc8.model.Showtime;
import com.teamc8.model.Ticket;
import lombok.Data;

import java.util.Date;

@Data
public class NewBookingRequest {

    private int showtimeId;
    private int paymentCardId;
    private int promotionId;
    private float total;
    private Date date;

}
