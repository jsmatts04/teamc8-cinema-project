package com.teamc8.controller;

import com.teamc8.model.Movie;
import com.teamc8.model.MovieCover;
import com.teamc8.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<?> getMovieById(@PathVariable("id") int id) {
        Optional<Movie> movie = movieService.getMovieById(id);

        if (movie.isPresent())
            return ResponseEntity.ok(movie.get());
        else
            return new ResponseEntity<>("Movie with ID " + id + " not found.", HttpStatus.NOT_FOUND);

    }

    //get all movie covers for a status
    @GetMapping(path = "/cover")
    public ResponseEntity<?> getAllMovieCoversForStatus(@RequestParam String status) {
        List<MovieCover> movieCoverList = movieService.getAllMovieCoversForStatus(status);
        if (!movieCoverList.isEmpty())
            return ResponseEntity.ok(movieCoverList);
        else
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
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
