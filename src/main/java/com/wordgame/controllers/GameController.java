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

    @MessageMapping("/guess")
    @SendTo("/game/guess")
    public PlayerGuess guess(PlayerGuess guess) throws Exception {
        System.out.println("Hit /game/guess endpoint");
        System.out.println("user Id " + guess.getUserId());
        System.out.println("User Guess " + guess.getGuess());
        Thread.sleep(1000); // simulated delay
        return new PlayerGuess("Player Guess, " + HtmlUtils.htmlEscape(guess.getGuess()) + "!",
                "User Id, " + HtmlUtils.htmlEscape(guess.getUserId()) + "!");
    }


    // Used to send a one time message to users, such as subscribing to a game
//    @Controller
//    public class SubscribeMappingController {
//        @SubscribeMapping("/subscribe")
//        public String sendOneTimeMessage() {
//            return "server one-time message via the application";
//        }
//    }

    // Used for repetitive messaging from application to clients.
//    @Controller
//    public class MessageMappingController {
//        @MessageMapping("/request")
//        public void handleMessageWithoutResponse(String message) {
//            logger.info("Message without response: {}", message);
//        }
//    }
}
