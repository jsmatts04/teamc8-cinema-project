package com.teamc8.controller;

import com.teamc8.model.Ticket;
import com.teamc8.model.projection.TicketProjection;
import com.teamc8.model.request.NewTicketsRequest;
import com.teamc8.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/ticket")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @GetMapping()
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @GetMapping(path = "/find")
    public List<TicketProjection> getAllTicketsByBooking(@RequestParam("booking") int bookingId) {
        return ticketService.getAllTicketsByBooking(bookingId);
    }

    @PostMapping(path = "/add")
    public String addTicket(@RequestBody NewTicketsRequest newTickets) {
        return ticketService.addTicket(newTickets);
    }

}
