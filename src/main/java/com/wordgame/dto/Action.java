package com.wordgame.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Action {
    Room room;
    Command command;

    public Action(Room room, Command command) {
        this.room = room;
        this.command = command;
    }
}
