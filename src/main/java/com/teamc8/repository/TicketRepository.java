package com.teamc8.repository;

import com.teamc8.model.Ticket;
import com.teamc8.model.projection.TicketProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {

    List<TicketProjection> findAllProjectedByBookingId(int bookingId);
}
