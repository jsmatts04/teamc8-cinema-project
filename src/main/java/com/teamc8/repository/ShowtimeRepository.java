package com.teamc8.repository;

import com.teamc8.model.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Integer> {

    boolean existsByDateAndTime(LocalDate date, LocalTime time);

    List<Showtime> findAllByMovieIdAndDate(int movieId, LocalDate date);
}
