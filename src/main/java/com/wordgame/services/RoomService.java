package com.wordgame.services;

import com.wordgame.dto.Player;
import com.wordgame.dto.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class RoomService {

    private final Map<String, Room> activeRooms;
    private final Map<String, Room> waitingRooms;

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private RoomService (HashMap<String, Room> activeRooms, HashMap<String, Room> waitingRooms) {
        this.activeRooms = activeRooms;
        this.waitingRooms = waitingRooms;
    }

    private void toActive(String roomId) {
        Room activeRoom = waitingRooms.remove(roomId);
        if (activeRoom != null)
            activeRooms.put(roomId, activeRoom);
    }

    private Room createRoom(int limit) {
        String uuid = UUID.randomUUID().toString();
        Room room = new Room(uuid, limit);
        System.out.println("Room Id: " + uuid);
        waitingRooms.put(uuid, room);
        return room;
    }

    public Room addPlayerToRoom(String username, String userId, String roomId) {
        Room currentRoom = isValidUsername(username) ? getWaitingRoom(roomId) : null;

        if(currentRoom != null) {
            currentRoom.addPlayer(username);

            if(currentRoom.isFull()) {
                toActive(roomId);
                this.template.convertAndSend("/app/room/" + roomId, "Start The Game");
            }
        }

        return currentRoom;
    }

    public Room getWaitingRoom(String roomId) {
        return waitingRooms.get(roomId);
    }

    public String getHeaderValue(MessageHeaders headers, String key) {
        MultiValueMap<String, String> multiValueMap = headers.get(StompHeaderAccessor.NATIVE_HEADERS,MultiValueMap.class);
        String value = multiValueMap.get(key).get(0);

        return value;
    }

    public boolean isValidUsername(String username) {
        int maxChar = 30;
        return username != null && username.length() <= maxChar;
    }

    public boolean isValidPlayerAmount(int amount) {
        int minPlayers = 2;
        int maxPlayers = 4;
        return (amount <= maxPlayers && amount >= minPlayers);
    }

    public Room findRoom(int limit) {
        return waitingRooms.values()
                .stream()
                .filter(r -> r.getLimit() == limit)
                .findFirst()
                .orElse(createRoom(limit));
    }


}
