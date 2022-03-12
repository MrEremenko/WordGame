package com.wordgame.controllers;

import com.wordgame.dto.Greeting;
import com.wordgame.dto.HelloMessage;
import com.wordgame.dto.PlayerGuess;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GameController {
    // receive words from up to 4 users

    @MessageMapping("/game")
    @SendTo("/topic/greetings")
    public PlayerGuess guess(PlayerGuess guess) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new PlayerGuess("Player Guess, " + HtmlUtils.htmlEscape(guess.getGuess()) + "!");
    }

}
