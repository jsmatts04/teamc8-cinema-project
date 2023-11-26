package com.teamc8.service;

import com.teamc8.model.Seat;
import com.teamc8.model.Showtime;
import com.teamc8.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SeatService {

    private final SeatRepository seatRepository;

    public List<Seat> getAllSeats() {
        return seatRepository.findAll();
    }

    public List<Seat> getAllSeatsForShowtime(int showtimeId) {
        return seatRepository.findAllByShowtimeId(showtimeId);
    }

    public void generateSeats(Showtime showtime) {
        List<Seat> seats = new ArrayList<>();
        char[] rows = {'A', 'B', 'C'};
        for (char row : rows) {
            for (int i = 1; i < 11; i++) {
                Seat seat = Seat.builder().seatNum(i).seatRow(row).reserved(false).showtime(showtime).build();
                seats.add(seat);
            }
        }
        for (int i = 3; i < 9; i++) {
            Seat seat = Seat.builder().seatNum(i).seatRow('D').reserved(false).showtime(showtime).build();
            seats.add(seat);
        }
        for (int i = 4; i < 8; i++) {
            Seat seat = Seat.builder().seatNum(i).seatRow('E').reserved(false).showtime(showtime).build();
            seats.add(seat);
        }

        seatRepository.saveAll(seats);
    }
}
