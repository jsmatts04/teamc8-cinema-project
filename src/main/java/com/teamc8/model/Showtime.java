package com.teamc8.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "showtime")
public class Showtime {

    //id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //date_time
    @Column(name = "date")
    private LocalDate date;

    @Column(name = "time")
    private LocalTime time;

    //room_id
    @ManyToOne
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    private Room room;

    //movie_id
    @ManyToOne
    @JoinColumn(name = "movie_id", referencedColumnName = "id")
    private Movie movie;

}
