package com.teamc8.service;

import com.teamc8.exception.MovieNotFoundException;
import com.teamc8.model.Movie;
import com.teamc8.model.MovieCover;
import com.teamc8.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<Movie> getMovies() {
        return movieRepository.findAll();
    }

    public Movie getMovieById(int id) {
        return movieRepository.findById(id).orElseThrow(() ->
                new MovieNotFoundException("Movie by id " + id + "does not exist in database."));
    }

    //method that gets id of movie

    public List<MovieCover> getAllMovieTitleAndPicture() {
        return movieRepository.findAllProjectedBy();
    }

    public List<MovieCover> getAllMovieCoversForStatus(String status) {
        return movieRepository.findAllProjectedByStatus(status);
    }

    //check if movie exists
    public boolean movieExists(int id) {
        return movieRepository.existsById(id);
    }

    public Movie addMovie(Movie movie) {
        Movie savedMovie = movieRepository.save(movie);
        return movieRepository.save(movie);
    }

    //delete movie
    public boolean deleteMovie(int id) {
        movieRepository.deleteById(id);
        return true;
    }

    //update movie
    public Movie updateMovie(Movie movie) {
        return movieRepository.save(movie);
    }

}
