package com.wordgame.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/connect")
public class ConnectionController {

    //method which
    @PostMapping("/verify")
    public String verify(String token, String userId) {

        //return a new id if it doesn't exist
        //create a websocket connection
        return null;
    }
}
