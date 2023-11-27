package com.teamc8.controller;

import com.teamc8.model.Seat;
import com.teamc8.service.SeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/seat")
@RequiredArgsConstructor
public class SeatController {

    private final SeatService seatService;

    @GetMapping
    public List<Seat> getAllSeats() {
        return seatService.getAllSeats();
    }

    @GetMapping(path = "/showtime/{id}")
    public List<Seat> getAllSeatsForShowtime(@PathVariable("id") int showtimeId) {
        return seatService.getAllSeatsForShowtime(showtimeId);
    }
}
