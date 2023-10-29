package com.teamc8.repository;

import com.teamc8.model.Movie;
import com.teamc8.model.projection.MovieCover;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {

    //find all projects by
    List<MovieCover> findAllProjectedBy();

    //find all projects by status
    List<MovieCover> findAllProjectedByMovieStatusId(short status);
}
