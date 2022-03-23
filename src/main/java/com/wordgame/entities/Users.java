package com.wordgame.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
public class Users {

    @Id
    private String id;

    @Column
    private Timestamp dateCreated;
}
