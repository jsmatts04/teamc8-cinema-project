package com.teamc8.service;

import com.teamc8.config.email.EmailSender;
import com.teamc8.model.Booking;
import com.teamc8.model.Ticket;
import com.teamc8.model.dto.TicketInfo;
import com.teamc8.model.projection.TicketProjection;
import com.teamc8.model.request.NewTicketsRequest;
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
    private final EmailSender bookingConfirmationEmailService;

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
    public String addTicket(NewTicketsRequest newTicketsRequests) {
        List<Ticket> tickets = new ArrayList<>();
        Booking booking = bookingService.getBookingById(newTicketsRequests.getBookingId());
        for (TicketInfo ticketRequest : newTicketsRequests.getTickets()) {
            Ticket ticket = Ticket.builder()
                    .booking(bookingService.getBookingById(newTicketsRequests.getBookingId()))
                    .type(ticketTypeRepository.findById(ticketRequest.getTypeId()).orElse(null))
                    .seat(seatService.getSeatById(ticketRequest.getSeatId()))
                    .build();
            tickets.add(ticket);
            seatService.reserveSeat(ticketRequest.getSeatId());
        }
        ticketRepository.saveAll(tickets);
        //send a booking confirmation email
        sendBookingConfirmationEmail(booking, tickets);

        return "Tickets added";
    }

    private void sendBookingConfirmationEmail(Booking booking, List<Ticket> tickets) {
        String userEmail = booking.getUser().getEmail();
        String emailContent = buildBookingConfirmationEmail(booking.getUser().getFirstName(), booking, tickets);
        bookingConfirmationEmailService.send(userEmail, emailContent);
    }

    private String buildBookingConfirmationEmail(String name, Booking booking, List<Ticket> tickets) {
        String emailContent = "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">" +
                "<span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">" +
                "Your Booking Confirmation</span>" +
                "<p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">" +
                "Hi " + name + "," +
                "</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">" +
                "Thank you for your booking. Your booking ID is: " + booking.getId() + " for the movie '" + booking.getShowtime().getMovie().getTitle() + "'. Here are your ticket details:" +
                "</p>";

        for (Ticket ticket : tickets) {
            emailContent += "<p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">" +
                    "Seat: " + ticket.getSeat().getSeatRow() + ticket.getSeat().getSeatNum() + ", Type: " + ticket.getType().getType() +
                    "</p>";
        }

        emailContent += "<p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">" +
                "Enjoy your movie!" +
                "</p></div>";

        return emailContent;
    }

    //get ticket by id
    public Ticket getTicketById(int ticketId) {
        return ticketRepository.findById(ticketId).orElse(null);
    }
}
