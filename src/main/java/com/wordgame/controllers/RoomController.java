package com.wordgame.controllers;

import com.wordgame.dto.Room;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
public class RoomController {

    @SubscribeMapping("/roomId")
    public Room connectRoom() {
//        TODO: if there is a room available return this room;
//        else return new room
        System.out.println("In connectRoom()");
        return createRoom();
    }

    private Room createRoom() {
        UUID uuid = UUID.randomUUID();
        System.out.println("Room Id: " + uuid.toString());
        return new Room(uuid.toString());
    }

    
}
