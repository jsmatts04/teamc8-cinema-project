package com.teamc8.model.request;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class NewShowtimeRequest {

    private int movieId;
    private Timestamp timestamp;
    private int roomId;
}
