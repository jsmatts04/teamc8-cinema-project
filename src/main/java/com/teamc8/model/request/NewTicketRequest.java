package com.teamc8.model.request;

import com.teamc8.model.Booking;
import com.teamc8.model.Seat;
import com.teamc8.model.TicketType;
import lombok.Data;

@Data
public class NewTicketRequest {

    private int bookingId;
    private int typeId;
    private int seatId;

}
