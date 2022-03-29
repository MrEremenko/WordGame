package com.wordgame.dto;

public enum Command {
    START("START"),
    READY("READY"),
    GUESS("GUESS"),
    NEWROUND("NEW ROUND"),
    WAITING("WAITING"),
    ENDGAME("END GAME"),
    DISCONNECT("DISCONNECT");

    private final String text;

    Command(final String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }
}
