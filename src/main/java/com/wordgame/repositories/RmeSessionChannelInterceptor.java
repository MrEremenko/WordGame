package com.wordgame.repositories;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.util.MultiValueMap;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RmeSessionChannelInterceptor implements ChannelInterceptor {

    @Value("${spring.secret}")
    private String secret;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        String token = null;
        MessageHeaders headers = message.getHeaders();
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        System.out.println("[Channcel Interceptor] Command: " + accessor.getCommand());

        MultiValueMap<String, String> multiValueMap = headers.get(StompHeaderAccessor.NATIVE_HEADERS,MultiValueMap.class);

        if(StompCommand.CONNECT.equals(accessor.getCommand())) {
            for (Map.Entry<String, List<String>> head : multiValueMap.entrySet()) {
                if(head.getKey().equals("token")) {
                    token = head.getValue().toString();
                    break;
                }
            }

            if(!verifyCaptcha(token)) {
                accessor = StompHeaderAccessor.create(StompCommand.ERROR);
                accessor.setMessage("Error when connecting.");
                message = MessageBuilder.createMessage(new byte[0], accessor.getMessageHeaders());
                channel.send(null);
            }
        }

        return message;
    }

    private boolean verifyCaptcha(String token) {
        boolean isVerified = false;
        Map<Object, Object> values = new HashMap<>();
        values.put("response", "test yo");//token.replaceAll("[\\[\\]]", ""));
        values.put("secret", secret);

        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .POST(encodeData(values))
                    .uri(URI.create("https://hcaptcha.com/siteverify"))
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .build();

            System.out.println("Request: " + request.toString());
            HttpResponse<String> response = client.send(request,
                    HttpResponse.BodyHandlers.ofString());

            JSONObject jsonObject = new JSONObject(response.body());
            isVerified = Boolean.parseBoolean(jsonObject.get("success").toString());



        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

        return isVerified;
    }

    private HttpRequest.BodyPublisher encodeData(Map<Object, Object> data) {
        StringBuilder builder = new StringBuilder();
        for (Map.Entry<Object, Object> entry : data.entrySet()) {
            if (builder.length() > 0) {
                builder.append("&");
            }
            builder.append(URLEncoder.encode(entry.getKey().toString(), StandardCharsets.UTF_8));
            builder.append("=");
            builder.append(URLEncoder.encode(entry.getValue().toString(), StandardCharsets.UTF_8));
        }
        String temp = builder.toString();
        return HttpRequest.BodyPublishers.ofString(builder.toString());
    }
}