package com.wordgame.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class Room {

    String roomId;
    boolean isFull;
    int limit;
    Set<String> guesses;
    ArrayList<Player> players;

    @JsonIgnore
    private int count;

    public Room(String roomId, int limit) {
        this.roomId = roomId;
        this.limit = limit;
        this.isFull = false;
        this.count = 0;
        guesses = new HashSet<>();
        players = new ArrayList<>();
    }

    public boolean addPlayer(String username) {
        if(!this.isFull) {
            Player player = new Player(String.valueOf(count), username);
            count++;
            players.add(player);
            this.isFull = players.size() >= this.limit;
        }

        return this.isFull;
    }
}
