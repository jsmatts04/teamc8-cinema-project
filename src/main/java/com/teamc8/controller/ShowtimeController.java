package com.teamc8.controller;

import com.teamc8.model.Showtime;
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

    @PostMapping(path = "/add")
    public Showtime addShowtime(@RequestBody NewShowtimeRequest newShowtimeRequest) {
        return showtimeService.addShowtime(newShowtimeRequest);
    }

}
