package com.teamc8.model;

import jakarta.persistence.*;
import org.hibernate.annotations.Type;

import java.util.Arrays;
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

    private String cast;

    @Column(length = 100)
    private String director;

    @Column(length = 100)
    private String producer;

    private short review_score;

    @Column(length = 512)
    private String trailer_picture;

    private String trailer_video;

    @Column(length = 10)
    private String film_rating;

    @Temporal(TemporalType.DATE)
    private Date release_date;

    @Enumerated(EnumType.STRING)
    private MovieStatus status;

    public enum MovieStatus {
        CURRENT, UPCOMING, ARCHIVED
    }

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

    public String getCast() {
        return cast;
    }

    public void setCast(String cast) {
        this.cast = cast;
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

    public short getReview_score() {
        return review_score;
    }

    public void setReview_score(short review_score) {
        this.review_score = review_score;
    }

    public String getTrailer_picture() {
        return trailer_picture;
    }

    public void setTrailer_picture(String trailer_picture) {
        this.trailer_picture = trailer_picture;
    }

    public String getTrailer_video() {
        return trailer_video;
    }

    public void setTrailer_video(String trailer_video) {
        this.trailer_video = trailer_video;
    }

    public String getFilm_rating() {
        return film_rating;
    }

    public void setFilm_rating(String film_rating) {
        this.film_rating = film_rating;
    }

    public Date getRelease_date() {
        return release_date;
    }

    public void setRelease_date(Date release_date) {
        this.release_date = release_date;
    }

    public MovieStatus getStatus() {
        return status;
    }

    public void setStatus(MovieStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Movie{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", synopsis='" + synopsis + '\'' +
                ", category='" + category + '\'' +
                ", cast='" + cast + '\'' +
                ", director='" + director + '\'' +
                ", producer='" + producer + '\'' +
                ", review_score=" + review_score +
                ", trailer_picture=" + trailer_picture +
                ", trailer_video='" + trailer_video + '\'' +
                ", film_rating='" + film_rating + '\'' +
                ", release_date=" + release_date +
                ", status=" + status +
                '}';
    }
}
