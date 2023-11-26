package com.teamc8.repository;

import com.teamc8.model.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Integer> {
    boolean existsByTimestamp(Timestamp timestamp);
}
