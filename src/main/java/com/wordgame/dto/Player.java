package com.wordgame.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Player {
    String id;
    String username;

    public Player(String id, String username) {
        this.id = id;
        this.username = username;
    }
}
