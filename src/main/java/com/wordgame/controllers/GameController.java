package com.wordgame.controllers;

import com.wordgame.dto.Greeting;
import com.wordgame.dto.HelloMessage;
import com.wordgame.dto.PlayerGuess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GameController {
    // receive words from up to 4 users
    @Autowired
    private SimpMessagingTemplate template;

    @MessageMapping("/join/{room}")
    public void start(@DestinationVariable String room, PlayerGuess guess) throws Exception {
        System.out.println("Hit /player/guess endpoint");
        System.out.println("user Id " + guess.getUserId());
        System.out.println("User Guess " + guess.getGuess());
        Thread.sleep(1000); // simulated delay
        System.out.println("Destination: " + "/room/" + room);
        this.template.convertAndSend("/room/" + room, guess);
    }

    @MessageMapping("/guess/{room}")
    public void guess(@DestinationVariable String room, PlayerGuess guess) throws Exception {
        System.out.println("Hit /player/guess endpoint");
        System.out.println("user Id " + guess.getUserId());
        System.out.println("User Guess " + guess.getGuess());
        Thread.sleep(1000); // simulated delay
        System.out.println("Destination: " + "/room/" + room);
        this.template.convertAndSend("/room/" + room, guess);
    }
}
