package com.wordgame.dto;

public enum Command {
    START("START"),
    NEWROUND("NEW ROUND"),
    WAITING("WAITING"),
    ENDGAME("END GAME");

    private final String text;

    Command(final String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }
}
