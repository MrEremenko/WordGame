package com.wordgame.controllers;

import com.wordgame.dto.Greeting;
import com.wordgame.dto.HelloMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {


    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting() throws Exception {
        Thread.sleep(1000); // simulated delay
        System.out.println("Greeting Test");
        return new Greeting("Hello, " + HtmlUtils.htmlEscape("World" + "!"));
    }

}
