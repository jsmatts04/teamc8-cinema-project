package com.teamc8.controller;

import com.teamc8.model.Showtime;
import com.teamc8.model.request.NewShowtimeRequest;
import com.teamc8.model.request.GetShowtimeRequest;
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

    @GetMapping(path = "/get-by-movie-date")
    public List<Showtime> getAllShowtimesForMovieDate(@RequestBody GetShowtimeRequest getShowtimeRequest) {
        return showtimeService.getAllShowtimesForMovieDate(getShowtimeRequest);
    }

    @GetMapping(path = "/get-by-date")
    public List<Showtime> getAllShowtimesForDate(@RequestBody GetShowtimeRequest getShowtimeRequest) {
        return showtimeService.getAllShowtimesForDate(getShowtimeRequest);
    }

    @GetMapping(path = "/get-by-movie")
    public List<Showtime> getAllShowtimesForMovie(@RequestBody GetShowtimeRequest getShowtimeRequest) {
        return showtimeService.getAllShowtimesForMovie(getShowtimeRequest);
    }


    @GetMapping(path = "/get-by-movie-date-room")
    public List<Showtime> getAllShowtimesForMovieDateRoom(@RequestBody GetShowtimeRequest getShowtimeRequest) {
        return showtimeService.getAllShowtimesForMovieDateRoom(getShowtimeRequest);
    }

    @PostMapping(path = "/add")
    public Showtime addShowtime(@RequestBody NewShowtimeRequest newShowtimeRequest) {
        return showtimeService.addShowtime(newShowtimeRequest);
    }

}
