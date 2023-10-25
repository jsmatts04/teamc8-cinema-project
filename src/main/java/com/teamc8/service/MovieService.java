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

    public List<MovieCover> getAllMovieTitleAndPicture() {
        return movieRepository.findAllProjectedBy();
    }

    public List<MovieCover> getAllMovieCoversForStatus(short status) {
        return movieRepository.findAllProjectedByMovieStatusId(status);
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
