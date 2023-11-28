package com.teamc8.model.request;

import com.teamc8.model.dto.TicketInfo;
import lombok.Data;

@Data
public class NewTicketsRequest {

    private int bookingId;
    private TicketInfo[] tickets;

}
