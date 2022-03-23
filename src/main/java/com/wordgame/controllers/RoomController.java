package com.wordgame.controllers;

import com.wordgame.dto.Player;
import com.wordgame.dto.Room;
import com.wordgame.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller
public class RoomController {

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private RoomService service;

    @SubscribeMapping("/getRoom/{limit}")
    public Room getRoom(@DestinationVariable int limit) {
        return service.isValidPlayerAmount(limit) ? service.findRoom(limit) : null;

    @SubscribeMapping("/room/{roomId}")
    public Room joinRoom(@DestinationVariable String roomId, MessageHeaders headers) {
        String username = service.getHeaderValue(headers, "username");
        String userId = service.getHeaderValue(headers, "id");
        Room currentRoom = service.addPlayerToRoom(username, userId, roomId);

        return currentRoom;
    }

}
