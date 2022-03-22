package com.wordgame.controllers;

import com.wordgame.dto.Room;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
public class RoomController {

    @SubscribeMapping("/room/{roomId}")
    public void joinRoom(@DestinationVariable String roomId) {
        //if room id doesn't exist, close connection (if possible) or don't do anything

        //user joins room that they got from the server
        //send to everyone that this user just joined
        //  along with that, send if the game has started
        //  close the room if the room is full
    }

    @SubscribeMapping("/roomId")
    public Room connectRoom() {
//        TODO: if there is a room available return this room;
//        else return new room
        System.out.println("In connectRoom()");
        //if subscriber list if full, start game
        return createRoom();
    }

    private Room createRoom() {
        UUID uuid = UUID.randomUUID();
        System.out.println("Room Id: " + uuid.toString());
        return new Room(uuid.toString());
    }
}
