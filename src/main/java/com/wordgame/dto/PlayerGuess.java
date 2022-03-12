package com.wordgame.dto;

public class PlayerGuess {

    private String guess;

    public PlayerGuess() {
    }

    public PlayerGuess(String guess) {
        this.guess = guess;
    }

    public String getGuess() {
        return guess;
    }

    public void setGuess(String guess) {
        this.guess = guess;
    }
}
