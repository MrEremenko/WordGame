package com.wordgame.services;

import com.wordgame.dto.PlayerGuess;
import com.wordgame.dto.Room;
import org.springframework.stereotype.Service;

@Service
public class GameService {

    public void guess(Room room, PlayerGuess guess) throws Exception {
        System.out.println("Hit /player/guess endpoint");
        System.out.println("user Id " + guess.getUserId());
        System.out.println("User Guess " + guess.getGuess());
        Thread.sleep(1000); // simulated delay
        System.out.println("Destination: " + "/room/" + room);

        //return something
    }
}
