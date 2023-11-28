package com.teamc8.model.request;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class NewShowtimeRequest {

    private int movieId;
    private LocalDate date;
    private LocalTime time;
//    private int roomId;
}
