package com.wordgame.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Setter
@Getter
@Entity
public class Guesses {

    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private int id;

    @Column
    private int round;

    @Column
    private String word;

    @ManyToOne
    @JoinColumn(name="gameId", nullable = false)
    private Games game;

    @ManyToOne
    @JoinColumn(name="userId", nullable = false)
    private Users user;

}
