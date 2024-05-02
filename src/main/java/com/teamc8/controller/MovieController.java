package com.teamc8.controller;

import com.teamc8.model.Movie;
import com.teamc8.model.projection.MovieCover;
import com.teamc8.service.MovieService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/movie")
public class MovieController {

    private final MovieService movieService;

    //constructor
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    //get all movies
    @GetMapping
    public List<Movie> getMovies() {
        return movieService.getMovies();
    }

    //get movie by id
    @GetMapping(path = "/{id}")
    public Movie getMovieById(@PathVariable int id) {
        return movieService.getMovieById(id);
    }

    //get movie covers
    @GetMapping(path = "/cover")
    public List<MovieCover> getAllMovieCovers(@RequestParam short status) {
        if (status == 0)
            return movieService.getAllMovieCovers();
        else
            return movieService.getAllMovieCoversForStatus(status);
    }

    //add movie
    @PostMapping(path = "/add")
    public Movie addMovie(@RequestBody Movie movie) {
        return movieService.addMovie(movie);
    }

    //delete movie
    @DeleteMapping(path = "/delete")
    public void deleteMovie(@RequestParam int id) {
        movieService.deleteMovie(id);
    }


    //update movie
    @PutMapping(path = "/update")
    public Movie updateMovie(@RequestBody Movie movie) {
        return movieService.updateMovie(movie);
    }
}
