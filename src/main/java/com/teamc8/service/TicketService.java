package com.teamc8.service;

import com.teamc8.model.Ticket;
import com.teamc8.model.projection.TicketProjection;
import com.teamc8.model.request.NewTicketRequest;
import com.teamc8.repository.TicketRepository;
import com.teamc8.repository.TicketTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final BookingService bookingService;
    private final SeatService seatService;
    private final TicketTypeRepository ticketTypeRepository;

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    //delete ticket
    public void deleteTicket(Ticket ticket) {
        ticketRepository.delete(ticket);
    }

    //save ticket
    public Ticket saveTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    //get ticket by booking
    public List<TicketProjection> getAllTicketsByBooking(int bookingId) {
        return ticketRepository.findAllProjectedByBookingId(bookingId);
    }

    //update ticket
    public Ticket updateTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    //add ticket
    public String addTicket(NewTicketRequest[] newTicketRequests) {
        List<Ticket> tickets = new ArrayList<>();
        for (NewTicketRequest newTicketRequest : newTicketRequests) {
            Ticket ticket = Ticket.builder()
                    .booking(bookingService.getBookingById(newTicketRequest.getBookingId()))
                    .type(ticketTypeRepository.findById(newTicketRequest.getTypeId()).orElse(null))
                    .seat(seatService.getSeatById(newTicketRequest.getSeatId()))
                    .build();
            tickets.add(ticket);
            seatService.reserveSeat(newTicketRequest.getSeatId());
        }
        ticketRepository.saveAll(tickets);
        return "Tickets added";
    }

    //get ticket by id
    public Ticket getTicketById(int ticketId) {
        return ticketRepository.findById(ticketId).orElse(null);
    }
}
