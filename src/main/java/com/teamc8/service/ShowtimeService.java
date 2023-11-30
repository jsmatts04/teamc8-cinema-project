package com.teamc8.service;

import com.teamc8.exception.ShowtimeAlreadyScheduledException;
import com.teamc8.model.Movie;
import com.teamc8.model.Showtime;
import com.teamc8.model.request.GetShowtimeRequest;
import com.teamc8.model.request.NewShowtimeRequest;
import com.teamc8.repository.RoomRepository;
import com.teamc8.repository.ShowtimeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ShowtimeService {

    private final ShowtimeRepository showtimeRepository;
    private final MovieService movieService;
    private final RoomRepository roomRepository;
    private final SeatService seatService;

    public List<Showtime> getAllShowtimes() {
        return showtimeRepository.findAll();
    }

    public List<Showtime> getAllShowtimesForMovieDate(GetShowtimeRequest getShowtimeRequest) {
        return showtimeRepository.findAllByMovieIdAndDate(getShowtimeRequest.getMovieId(), getShowtimeRequest.getDate());
    }

    public Showtime getShowtimeById(int id) {
        return showtimeRepository.findById(id).orElseThrow(
            () -> new RuntimeException("Showtime by id not found: " + id));
    }

    public Showtime addShowtime(NewShowtimeRequest newShowtimeRequest) {
        // Check if date and time are not already scheduled
        if (showtimeRepository.existsByDateAndTime(newShowtimeRequest.getDate(), newShowtimeRequest.getTime())) {
            throw new ShowtimeAlreadyScheduledException("Showtime already scheduled at this date and time");
        }

        Movie movie = movieService.getMovieById(newShowtimeRequest.getMovieId());

        // Get end timestamp
        LocalDateTime startTimestamp = LocalDateTime.of(newShowtimeRequest.getDate(), newShowtimeRequest.getTime());
        LocalDateTime endTimestamp = startTimestamp.plusMinutes(movie.getFilmLength());

        // Check if a showtime exists within range
        Optional<List<Showtime>> optionalShowtimeList = showtimeRepository.findFirstByTimestamps(startTimestamp, endTimestamp);
        if (optionalShowtimeList.isPresent()) {
            List<Integer> conflictingShowtimeIds = new ArrayList<>();
            for (Showtime showtime : optionalShowtimeList.get()) {
                conflictingShowtimeIds.add(showtime.getId());
            }
            throw new ShowtimeAlreadyScheduledException("Conflicting showtimes with " + conflictingShowtimeIds);
        }

        // Create new seats
        Showtime showtime = showtimeRepository.save(Showtime.builder()
                .movie(movie)
                .date(newShowtimeRequest.getDate())
                .time(newShowtimeRequest.getTime())
                .endTimestamp(endTimestamp)
                .build());
        seatService.generateSeats(showtime);
        return showtime;
    }

    // Check if the showtime request is available by seeing if there are any showtimes
    // within the range of the showtime start and end
    public List<Showtime> validateShowtime(NewShowtimeRequest newShowtimeRequest) {
        Movie movie = movieService.getMovieById(newShowtimeRequest.getMovieId());
        LocalDateTime startTimestamp = LocalDateTime.of(newShowtimeRequest.getDate(), newShowtimeRequest.getTime());
        LocalDateTime endTimestamp = startTimestamp.plusMinutes(movie.getFilmLength());
        System.out.println("START: " + startTimestamp);
        System.out.println("END: " + endTimestamp);
        Optional<List<Showtime>> showtimeOptional = showtimeRepository.findFirstByTimestamps(startTimestamp, endTimestamp);
        return showtimeOptional.orElse(null);
    }
}
