package com.wordgame.controllers;

import com.wordgame.dto.Room;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
public class RoomController {

    @MessageMapping("/createRoom")
    @SendTo("/topic/newRoom")
    public Room createRoom() {
        UUID uuid = UUID.randomUUID();
        System.out.println("Room Id: " + uuid.toString());
        return new Room(uuid.toString());
    }
}
