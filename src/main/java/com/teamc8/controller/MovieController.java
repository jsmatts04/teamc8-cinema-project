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

    //constructor
    @Autowired
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
    public Movie getMovieById(@PathVariable("id") int id) {
        return movieService.getMovieById(id);
    }

    //get all movie covers for a status
    @GetMapping(path = "/cover")
    public List<MovieCover> getAllMovieCoversForStatus(@RequestParam String status) {
        return movieService.getAllMovieCoversForStatus(status);
    }

    //add movie
    @PostMapping(path = "/add")
    public ResponseEntity<Movie> addMovie(@RequestBody Movie movie) {
        return ResponseEntity.ok(movieService.addMovie(movie));
    }

    //delete movie
    @DeleteMapping(path = "/delete")
    public ResponseEntity<Void> deleteMovie(@RequestParam int id) {
        boolean result = movieService.deleteMovie(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    //update movie
    @PutMapping(path = "/update")
    public ResponseEntity<Movie> updateMovie(@RequestParam int id, @RequestBody Movie movie) {
        return ResponseEntity.ok(movieService.updateMovie(movie));
    }


}
