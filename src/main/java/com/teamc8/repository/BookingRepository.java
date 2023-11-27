package com.teamc8.repository;

import com.teamc8.model.Booking;
import com.teamc8.model.projection.BookingProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    List<BookingProjection> findAllProjectedBy();

    List<BookingProjection> findAllProjectedByUserEmail(String email);

}
