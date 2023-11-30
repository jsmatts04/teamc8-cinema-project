package com.teamc8.controller;

import com.teamc8.model.Showtime;
import com.teamc8.model.request.GetShowtimeRequest;
import com.teamc8.model.request.NewShowtimeRequest;
import com.teamc8.service.ShowtimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/showtime")
@RequiredArgsConstructor
public class ShowtimeController {

    private final ShowtimeService showtimeService;

    @GetMapping
    public List<Showtime> getAllShowtimes() {
        return showtimeService.getAllShowtimes();
    }

    @PostMapping(path = "/get-by-movie-date")
    public List<Showtime> getAllShowtimesForMovieDate(@RequestBody GetShowtimeRequest getShowtimeRequest) {
        return showtimeService.getAllShowtimesForMovieDate(getShowtimeRequest);
    }

    @PostMapping(path = "/add")
    public Showtime addShowtime(@RequestBody NewShowtimeRequest newShowtimeRequest) {
        return showtimeService.addShowtime(newShowtimeRequest);
    }

    @PostMapping(path = "/validate")
    public List<Showtime> validateShowtime(@RequestBody NewShowtimeRequest newShowtimeRequest) {
        return showtimeService.validateShowtime(newShowtimeRequest);
    }

}
