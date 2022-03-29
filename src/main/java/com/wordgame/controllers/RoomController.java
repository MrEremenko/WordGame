package com.wordgame.controllers;

import com.wordgame.dto.*;
import com.wordgame.services.GameService;
import com.wordgame.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Controller
public class RoomController {

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private RoomService roomService;

    @Autowired
    private GameService gameService;

    @SubscribeMapping("/getRoom/{limit}")
    public Room getRoom(@DestinationVariable int limit) {
        return roomService.isValidPlayerAmount(limit) ? roomService.findRoom(limit) : null;
    }

    @SubscribeMapping("/room/{roomId}")
    public Action joinRoom(@DestinationVariable String roomId, MessageHeaders headers) {
        String username = roomService.getHeaderValue(headers, "username");
        String userId = roomService.getHeaderValue(headers, "id");
        String sessionId = headers.get(StompHeaderAccessor.SESSION_ID_HEADER).toString();
        Action action = roomService.addPlayerToRoom(username, userId, roomId, sessionId);
        sendMessage(roomId, action);
        return action;
    }

    @MessageMapping("/ready/{roomId}")
    public void playerReady(@DestinationVariable String roomId, String playerId) {
        Room room = roomService.getActiveRoom(roomId);
        Player player = room.setPlayerReady(playerId);
        sendMessage(roomId, player, Command.READY);
    }

    @MessageMapping("/guess/{roomId}")
    public void playerGuess(@DestinationVariable String roomId, PlayerGuess guess) {
        Room room = roomService.getActiveRoom(roomId);
        sendMessage(roomId, guess, Command.GUESS);
    }

    @EventListener
    private void handSessionDisconnect(SessionDisconnectEvent event) {
        String sessionId = event.getSessionId();
        Player player = roomService.getDisconnectedPlayer(sessionId);
        sendMessage(player.getRoomId(), player, Command.DISCONNECT);
    }

    private void sendMessage(String roomId, Action action) {
        this.template.convertAndSend("/app/room/" + roomId, action);
    }

    private void sendMessage(String roomId, Object object, Command command) {
        Action action = new Action(command, object);
        sendMessage(roomId, action);
    }
}
