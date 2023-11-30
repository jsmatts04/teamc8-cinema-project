package com.teamc8.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    //date
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private LocalDate date;

    // time
    @Column(name = "time")
    @Temporal(TemporalType.TIME)
    private LocalTime time;

    // timestamp that showtime ends
    @Column(name = "end_timestamp")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime endTimestamp;

    //room_id
    @ManyToOne
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    private Room room;

    //movie_id
    @ManyToOne
    @JoinColumn(name = "movie_id", referencedColumnName = "id")
    private Movie movie;

}
