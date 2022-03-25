package com.wordgame.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Action {
    Object object;
    Command command;

    public Action(Command command, Object object) {
        this.object = object;
        this.command = command;
    }
}
