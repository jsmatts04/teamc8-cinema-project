package com.teamc8.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String synopsis;

    @Column(length = 50)
    private String category;

    private String actors;

    @Column(length = 100)
    private String director;

    @Column(length = 100)
    private String producer;

    @Column(name = "review_score")
    private short reviewScore;

    @Column(length = 512, name = "trailerPicture")
    private String trailerPicture;

    @Column(name = "trailer_video")
    private String trailerVideo;

    @Column(length = 10, name = "film_rating")
    private String filmRating;

    @Column(name = "film_length")
    private short filmLength;

    @Column(name = "release_date")
    @Temporal(TemporalType.DATE)
    private Date releaseDate;

    @Column(length = 20)
    private String status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSynopsis() {
        return synopsis;
    }

    public void setSynopsis(String synopsis) {
        this.synopsis = synopsis;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getActors() {
        return actors;
    }

    public void setActors(String actors) {
        this.actors = actors;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getProducer() {
        return producer;
    }

    public void setProducer(String producer) {
        this.producer = producer;
    }

    public short getReviewScore() {
        return reviewScore;
    }

    public void setReviewScore(short review_score) {
        this.reviewScore = review_score;
    }

    public String getTrailerPicture() {
        return trailerPicture;
    }

    public void setTrailerPicture(String trailer_picture) {
        this.trailerPicture = trailer_picture;
    }

    public String getTrailerVideo() {
        return trailerVideo;
    }

    public void setTrailerVideo(String trailer_video) {
        this.trailerVideo = trailer_video;
    }

    public String getFilmRating() {
        return filmRating;
    }

    public void setFilmRating(String film_rating) {
        this.filmRating = film_rating;
    }

    public short getFilmLength() {
        return filmLength;
    }

    public void setFilmLength(short filmLength) {
        this.filmLength = filmLength;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date release_date) {
        this.releaseDate = release_date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Movie{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", synopsis='" + synopsis + '\'' +
                ", category='" + category + '\'' +
                ", cast='" + actors + '\'' +
                ", director='" + director + '\'' +
                ", producer='" + producer + '\'' +
                ", review_score=" + reviewScore +
                ", trailer_picture=" + trailerPicture +
                ", trailer_video='" + trailerVideo + '\'' +
                ", film_rating='" + filmRating + '\'' +
                ", release_date=" + releaseDate +
                ", status=" + status +
                '}';
    }
}
