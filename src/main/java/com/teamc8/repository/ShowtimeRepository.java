package com.teamc8.repository;

import com.teamc8.model.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Integer> {
    boolean existsByTimestamp(Timestamp timestamp);

    List<Showtime> findAllByMovieIdAndTimestamp(int movieId, Timestamp date);

    List<Showtime> findAllByTimestamp(Timestamp timestamp);

    List<Showtime> findAllByMovieIdAndTimestampAndRoomId(int movieId, Timestamp timestamp, int roomId);

    List<Showtime> findAllByMovieId(int movieId);
}
