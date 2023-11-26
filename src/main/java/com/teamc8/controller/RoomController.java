package com.teamc8.controller;

import com.teamc8.model.Room;
import com.teamc8.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/room")
@RequiredArgsConstructor

public class RoomController {

    private final RoomService roomService;

    @GetMapping
    public List<Room> getRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/{id}")
    public Room getRoomById(@PathVariable int id) {
        return roomService.getRoomById(id);
    }

    @PostMapping(path= "/add")
    public Room addRoom(@RequestBody Room room) {
        return roomService.addRoom(room);
    }

    @PutMapping(path= "/update")
        public Room updateRoom(@RequestBody Room room) {
            return roomService.updateRoom(room);
        }

        @DeleteMapping(path= "/delete")
    public void deleteRoom(@RequestBody Room room) {
        roomService.deleteRoom(room);
        }



}
