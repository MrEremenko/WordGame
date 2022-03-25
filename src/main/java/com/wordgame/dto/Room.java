package com.wordgame.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
public class Room {

    String roomId;
    boolean isFull;
    int limit;
    Set<String> guesses;
    Map<String, Player> players;

    @JsonIgnore
    private int count;

    public Room(String roomId, int limit) {
        this.roomId = roomId;
        this.limit = limit;
        this.isFull = false;
        this.count = 0;
        guesses = new HashSet<>();
        players = new HashMap<>();
    }

    public boolean addPlayer(String username) {
        if(!this.isFull) {
            Player player = new Player(String.valueOf(count), username);
            count++;
            players.put(player.id, player);
            this.isFull = players.size() >= this.limit;
        }

        return this.isFull;
    }

    public Player setPlayerReady(String playerId) {
        Player player  = players.get(playerId);
        if(player != null) player.setReady(true);

        return player;
    }

    public Collection resetPlayerReady() {
        Collection<Player> playerCollection = players.values();
        playerCollection.forEach(player -> player.setReady(true));
        return playerCollection;
    }

    public boolean isPlayersReady() {
        boolean isReady = true;

        for(Player player : players.values())
            if(!player.isReady()) {
                isReady = false;
                break;
            }
        return isReady;
    }
}
