package com.teamc8.repository;

import com.teamc8.model.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Integer> {

    boolean existsByDateAndTime(LocalDate date, LocalTime time);

    List<Showtime> findAllByMovieIdAndDate(int movieId, LocalDate date);

    @Query(value = "SELECT * FROM showtime s WHERE s.date + s.time < :newEndTimestamp AND s.end_timestamp > :newStartTimestamp",
    nativeQuery = true)
    Optional<List<Showtime>> findByTimestamps(LocalDateTime newStartTimestamp, LocalDateTime newEndTimestamp);
}
