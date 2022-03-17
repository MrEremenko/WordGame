package com.wordgame.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PlayerGuess {

    private String userId;
    private String guess;

    public PlayerGuess() {
    }

    public PlayerGuess(String guess, String userId) {
        this.guess = guess;
        this.userId = userId;
    }
}
