package com.teamc8.service;

import com.teamc8.exception.MovieNotFoundException;
import com.teamc8.exception.RoomNotFoundException;
import com.teamc8.exception.ShowtimeAlreadyScheduledException;
import com.teamc8.model.Movie;
import com.teamc8.model.Room;
import com.teamc8.model.Seat;
import com.teamc8.model.Showtime;
import com.teamc8.model.request.NewShowtimeRequest;
import com.teamc8.repository.MovieRepository;
import com.teamc8.repository.RoomRepository;
import com.teamc8.repository.ShowtimeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShowtimeService {

    private final ShowtimeRepository showtimeRepository;
    private final MovieRepository movieRepository;
    private final RoomRepository roomRepository;
    private final SeatService seatService;

    public List<Showtime> getAllShowtimes() {
        return showtimeRepository.findAll();
    }

    public Showtime addShowtime(NewShowtimeRequest newShowtimeRequest) {
        // Check if date and time are not already scheduled
        if (showtimeRepository.existsByTimestamp(newShowtimeRequest.getTimestamp())) {
            throw new ShowtimeAlreadyScheduledException("Showtime already scheduled at this date and time");
        }
        // Create new seats
        Movie movie = movieRepository.findById(newShowtimeRequest.getMovieId()).orElseThrow(
                () -> new MovieNotFoundException("Movie by id does not exist: " + newShowtimeRequest.getMovieId())
        );
        Room room = roomRepository.findById(newShowtimeRequest.getRoomId()).orElseThrow(
                () -> new RoomNotFoundException("Room by id does not exist: " + newShowtimeRequest.getRoomId())
        );
        Showtime showtime = showtimeRepository.save(Showtime.builder()
                .movie(movie)
                .room(room)
                .timestamp(newShowtimeRequest.getTimestamp())
                .build());
        seatService.generateSeats(showtime);
        return showtime;
    }
}
