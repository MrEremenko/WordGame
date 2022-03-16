package com.wordgame.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Room {

    String roomId;

    public Room(String roomId) {
        this.roomId = roomId;
    }
}
