package com.teamc8.repository;

import com.teamc8.model.Movie;
import com.teamc8.model.MovieCover;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {

    List<MovieCover> findAllProjectedBy();
    List<MovieCover> findAllProjectedByStatus(short status);
}
