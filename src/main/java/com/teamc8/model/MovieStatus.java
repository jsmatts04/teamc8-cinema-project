package com.teamc8.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "movie_status")
public class MovieStatus {

    //id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private short id;

    //status
    @Column(name = "status")
    private String statusType;

}
