package com.teamc8.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "room")
public class Room {

    //id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //number of seats
    @Column(name = "num_seats")
    private int numSeats;

    @Override
    public String toString() {
        return "Movie{" +
                "id=" + id +
                ", numSeats='" + numSeats + '\'' +
                '}';
    }










}
