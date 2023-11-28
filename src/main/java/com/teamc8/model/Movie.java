package com.teamc8.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "movie")
public class Movie {

    //id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //title
    @Column(nullable = false)
    private String title;

    //synopsis
    @Column(columnDefinition = "TEXT")
    private String synopsis;

    //category
    @Column(length = 50)
    private String category;

    //actors
    @Column(length = 255)
    private String actors;

    //director
    @Column(length = 100)
    private String director;

    //producer
    @Column(length = 100)
    private String producer;

    //review_score
    @Column(name = "review_score")
    private short reviewScore;

    //trailer picture
    @Column(length = 512, name = "trailerPicture")
    private String trailerPicture;

    //trailer video
    @Column(name = "trailer_video")
    private String trailerVideo;

    //film rating
    @Column(length = 10, name = "film_rating")
    private String filmRating;

    //film length
    @Column(name = "film_length")
    private short filmLength;

    //release date
    @Column(name = "release_date")
    @Temporal(TemporalType.DATE)
    private LocalDate releaseDate;

    //movie status
    @ManyToOne
    @JoinColumn(name = "movie_status_id", referencedColumnName = "id")
    private MovieStatus movieStatus;

}
