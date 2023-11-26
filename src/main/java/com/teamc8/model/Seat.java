package com.teamc8.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "seat")
public class Seat {

    //id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    //seat number
    @Column(name = "seat_num")
    private int seatNum;

    @Column(name = "seat_row")
    private char seatRow;

    //reserved
    @Column(name = "reserved")
    private boolean reserved;

    //showtime
    @ManyToOne
    @JoinColumn(name = "show_id", referencedColumnName = "id")
    private Showtime showtime;

}