package com.binh.carbooking.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class JwtReponse {
    int statusCode;
    String message;
    String accessToken;
    String username;
    List<String> roles;
    public JwtReponse(int statusCode, String message, String accessToken, String username, List<String> roles){
        this.statusCode = statusCode;
        this.message = message;
        this.accessToken = accessToken;
        this.username = username;
        this.roles = roles;
    }
}
