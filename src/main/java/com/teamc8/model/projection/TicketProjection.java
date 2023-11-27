package com.teamc8.model.projection;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.teamc8.model.Seat;

public interface TicketProjection {

    int getId();
    @JsonProperty("type")
    String getTypeType();
    Seat getSeat();

}
