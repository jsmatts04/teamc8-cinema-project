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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column(name = "seat_num")
    private int seatNum;


    @Column(name = "reserved")
    private boolean reserved;

    @ManyToOne
    @JoinColumn(name = "show_id", referencedColumnName = "id")
    private Showtime showtime;

    public String toString() {
        return "User{" +
                "id=" + id +
                ", seatNum='" + seatNum + '\'' +
                ", reserved='" + reserved + '\'' +
                ", showtime='" + showtime + '\'' +
                '}';
    }


}