package com.teamc8.model.request;

import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class GetShowtimeRequest {

    int movieId;
    int roomId;
    LocalDate date;
    LocalTime time;

}
