package com.teamc8.service;

import com.teamc8.config.JwtService;
import com.teamc8.exception.PaymentCardNotFoundException;
import com.teamc8.exception.UserNotFoundException;
import com.teamc8.model.*;
import com.teamc8.model.projection.BookingProjection;
import com.teamc8.model.request.NewBookingRequest;
import com.teamc8.repository.BookingRepository;
import com.teamc8.repository.PaymentCardRepository;
import com.teamc8.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserService userService;
    private final PaymentCardService paymentCardService;
    private final ShowtimeService showtimeService;
    private final PromotionService promotionService;
    private final JwtService jwtService;

    public List<BookingProjection> getAllBookings() {
        return bookingRepository.findAllProjectedBy();
    }

    public int addBooking(String authHeader, NewBookingRequest newBookingRequest) {
        String email = jwtService.extractUsername(jwtService.getTokenFromHeader(authHeader));

        Booking booking = Booking.builder()
                .user(userService.getUserByEmail(email))
                .date(newBookingRequest.getDate())
                .showtime(showtimeService.getShowtimeById(newBookingRequest.getShowtimeId()))
                .promotion(promotionService.getPromoById(newBookingRequest.getPromotionId()))
                .total(newBookingRequest.getTotal())
                .paymentCard(paymentCardService.getPaymentCardById(newBookingRequest.getPaymentCardId()))
                .build();

        Booking savedBooking = bookingRepository.save(booking);
        return savedBooking.getId();
    }

    public List<BookingProjection> getAllBookingsForUser(String authHeader) {
        String email = jwtService.extractUsername(jwtService.getTokenFromHeader(authHeader));
        return bookingRepository.findAllProjectedByUserEmail(email);
    }

    public Booking getBookingById(int bookingId) {
        return bookingRepository.findById(bookingId).orElse(null);
    }
}
