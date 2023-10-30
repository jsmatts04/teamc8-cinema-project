package com.teamc8.service;

import com.teamc8.exception.MovieNotFoundException;
import com.teamc8.model.Movie;
import com.teamc8.model.projection.MovieCover;
import com.teamc8.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    //constructor
    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    //get all movies
    public List<Movie> getMovies() {
        return movieRepository.findAll();
    }

    //get movie by id
    public Movie getMovieById(int id) {
        return movieRepository.findById(id).orElseThrow(() ->
                new MovieNotFoundException("Movie by id " + id + " does not exist in database."));
    }

    //get movie by title and picture
    public List<MovieCover> getAllMovieTitleAndPicture() {
        return movieRepository.findAllProjectedBy();
    }

    //get movie cover by status
    public List<MovieCover> getAllMovieCoversForStatus(short status) {
        return movieRepository.findAllProjectedByMovieStatusId(status);
    }

    //check if movie exists
    public boolean movieExists(int id) {
        return movieRepository.existsById(id);
    }

    //add movie
    public Movie addMovie(Movie movie) {
        Movie savedMovie = movieRepository.save(movie);
        return movieRepository.save(movie);
    }

    //delete movie
    public void deleteMovie(int id) {
        if (movieRepository.existsById(id))
            movieRepository.deleteById(id);
        else
            throw new MovieNotFoundException("Movie by id " + id + " cannot be deleted because it does not exist");
    }

    //update movie
    public Movie updateMovie(Movie movie) {
        if (movieRepository.existsById(movie.getId()))
            return movieRepository.save(movie);
        else
            throw new MovieNotFoundException("There is no movie by the id " + movie.getId() + " to be updated");
    }

}
