package com.teamc8.controller;

import com.teamc8.model.Booking;
import com.teamc8.model.projection.BookingProjection;
import com.teamc8.model.request.NewBookingRequest;
import com.teamc8.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/booking")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @GetMapping
    public List<BookingProjection> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping(path = "/get")
    public List<BookingProjection> getAllBookingsForUser(@RequestHeader("Authorization") String authHeader) {
        return bookingService.getAllBookingsForUser(authHeader);
    }

    @PostMapping(path = "/add")
    public int addBooking(@RequestHeader("Authorization") String authHeader, @RequestBody NewBookingRequest newBookingRequest) {
        return bookingService.addBooking(authHeader, newBookingRequest);
    }

}
