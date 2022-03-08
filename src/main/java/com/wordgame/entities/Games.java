package com.wordgame.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Setter
@Getter
@Entity
public class Games {

    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private int id;

    @Column
    private int playerCount;

    @Column
    private Timestamp dateCreated;
}
