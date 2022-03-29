package com.wordgame.services;

import com.wordgame.dto.Action;
import com.wordgame.dto.Command;
import com.wordgame.dto.Player;
import com.wordgame.dto.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
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

    private final Map<String, Player> players;

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private RoomService (HashMap<String, Room> activeRooms,
                         HashMap<String, Room> waitingRooms,
                         HashMap<String, Player> players) {
        this.activeRooms = activeRooms;
        this.waitingRooms = waitingRooms;
        this.players = players;
    }

    public Action addPlayerToRoom(String username, String userId, String roomId, String sessionId) {
        Room currentRoom = isValidUsername(username) ? getWaitingRoom(roomId) : null;
        Action action = null;
        if(currentRoom != null) {
            Player player = currentRoom.addPlayer(username);
            players.put(sessionId, player);
            action = currentRoom.isFull() ? startGame(roomId) : waitingGame(roomId);
        }

        return action;
    }

    public Room getActiveRoom(String roomId) {
        return activeRooms.get(roomId);
    }

    public Room getWaitingRoom(String roomId) {
        return waitingRooms.get(roomId);
    }

    public String getHeaderValue(MessageHeaders headers, String key) {
        MultiValueMap<String, String> multiValueMap = headers.get(StompHeaderAccessor.NATIVE_HEADERS,MultiValueMap.class);
        String value = multiValueMap.get(key).get(0);

        return value;
    }

    public Player getDisconnectedPlayer(String sessionId) {
        return players.get(sessionId);
    }
//
//    public String getSessionId(MessageHeaders headers) {
//        MultiValueMap<String, String> multiValueMap = headers.get(StompHeaderAccessor.SESSION_ID_HEADER);
//    }

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

    private Room toActive(String roomId) {
        Room activeRoom = waitingRooms.remove(roomId);
        if (activeRoom != null)
            activeRooms.put(roomId, activeRoom);
        return activeRoom;
    }

    private Room createRoom(int limit) {
        String uuid = UUID.randomUUID().toString();
        Room room = new Room(uuid, limit);
        System.out.println("Room Id: " + uuid);
        waitingRooms.put(uuid, room);
        return room;
    }

    private Action startGame(String roomId) {
        Room room = toActive(roomId);
        Action action = new Action(Command.START, room);
        return action;
    }

    private Action waitingGame(String roomId) {
        Room room = waitingRooms.get(roomId);
        Action action = new Action(Command.WAITING, room);
        return action;
    }
}
