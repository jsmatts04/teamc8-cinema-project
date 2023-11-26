package com.teamc8.service;

import com.teamc8.model.Room;
import com.teamc8.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room addRoom(Room room) {
        return roomRepository.save(room);
    }

    public Room updateRoom(Room room) {
        return roomRepository.save(room);
    }

    public void deleteRoom(Room room) {
        roomRepository.delete(room);
    }

    public Room getRoomById(int id) {
        return roomRepository.findById(id).orElse(null);
    }
}
