package com.teamc8.controller;

import com.teamc8.model.Movie;
import com.teamc8.model.MovieCover;
import com.teamc8.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/movie")
public class MovieController {

    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public List<Movie> getMovies() {
        return movieService.getMovies();
    }

    @GetMapping(path = "/{id}")
    public Movie getMovieById(@PathVariable("id") int id) {
        return movieService.getMovieById(id);
    }

    @GetMapping(path = "/cover")
    public List<MovieCover> getAllMovieCoversForStatus(@RequestParam String status) {
        return movieService.getAllMovieCoversForStatus(status);
    }

}
