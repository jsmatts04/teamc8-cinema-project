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
@Table(name = "ticket")
public class Ticket {

    //id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //booking id
    @ManyToOne
    @JoinColumn(name = "booking_id", referencedColumnName = "id")
    private Booking booking;

    //ticket type
    @ManyToOne
    @JoinColumn(name = "type", referencedColumnName = "id")
    private TicketType type;

    //seat
    @ManyToOne
    @JoinColumn(name = "seat_id", referencedColumnName = "id")
    private Seat seat;

    public String toString() {
        return "User{" +
                "id=" + id +
                ", booking_id='" + booking + '\'' +
                ", type='" + type + '\'' +
                ", seat_id='" + seat + '\'' +
                '}';
    }


}
