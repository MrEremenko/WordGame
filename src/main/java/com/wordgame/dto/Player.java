package com.wordgame.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class Player {
    String id;
    String username;
    ArrayList<String> guesses;
    boolean ready;

    public Player(String id, String username) {
        this.id = id;
        this.username = username;
        this.guesses = new ArrayList<>();
        this.ready = false;
    }
}
