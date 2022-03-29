package com.wordgame.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class Player {
    String playerId;
    String roomId;
    String username;
    ArrayList<String> guesses;
    boolean ready;

    public Player(String playerId, String username, String roomId) {
        this.roomId = roomId;
        this.playerId = playerId;
        this.username = username;
        this.guesses = new ArrayList<>();
        this.ready = false;
    }
}
