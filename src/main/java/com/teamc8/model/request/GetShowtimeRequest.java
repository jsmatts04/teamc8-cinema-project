package com.teamc8.model.request;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class GetShowtimeRequest {

    int movieId;
    int roomId;
    Timestamp timestamp;

}
