package com.teamc8.service;

import com.teamc8.exception.MovieNotFoundException;
import com.teamc8.exception.RoomNotFoundException;
import com.teamc8.exception.ShowtimeAlreadyScheduledException;
import com.teamc8.model.Movie;
import com.teamc8.model.Room;
import com.teamc8.model.Showtime;
import com.teamc8.model.request.NewShowtimeRequest;
import com.teamc8.model.request.GetShowtimeRequest;
import com.teamc8.repository.MovieRepository;
import com.teamc8.repository.RoomRepository;
import com.teamc8.repository.ShowtimeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    public List<Showtime> getAllShowtimesForMovieDate(GetShowtimeRequest getShowtimeRequest) {
        return showtimeRepository.findAllByMovieIdAndTimestamp(getShowtimeRequest.getMovieId(), getShowtimeRequest.getTimestamp());
    }

    public Showtime getShowtimeById(int id) {
        return showtimeRepository.findById(id).orElseThrow(
            () -> new RuntimeException("Showtime by id not found: " + id));
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

    public List<Showtime> getAllShowtimesForDate(GetShowtimeRequest getShowtimeRequest) {
        return showtimeRepository.findAllByTimestamp(getShowtimeRequest.getTimestamp());
    }

    public List<Showtime> getAllShowtimesForMovieDateRoom(GetShowtimeRequest getShowtimeRequest) {
        return showtimeRepository.findAllByMovieIdAndTimestampAndRoomId(getShowtimeRequest.getMovieId(),
                getShowtimeRequest.getTimestamp(), getShowtimeRequest.getRoomId());
    }

    public List<Showtime> getAllShowtimesForMovie(GetShowtimeRequest getShowtimeRequest) {
        return showtimeRepository.findAllByMovieId(getShowtimeRequest.getMovieId());
    }
}
