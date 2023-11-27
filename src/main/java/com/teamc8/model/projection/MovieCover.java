package com.teamc8.model.projection;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public interface MovieCover {
    int getId();

    String getTitle();

    String getTrailerPicture();

    Date getReleaseDate();

    String getFilmRating();
    @JsonProperty("movieStatus")
    String getMovieStatusStatusType();

}

