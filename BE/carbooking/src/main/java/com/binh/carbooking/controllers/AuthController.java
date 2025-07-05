package com.binh.carbooking.controllers;

import com.binh.carbooking.dto.request.LoginRequestDto;
import com.binh.carbooking.dto.request.RegisterRequestDto;
import com.binh.carbooking.dto.response.AuthUserResponseDto;
import com.binh.carbooking.dto.response.JwtResponseDto;

import com.binh.carbooking.dto.response.UserResponseDto;
import com.binh.carbooking.services.inf.IJwtAuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/auth")

public class AuthController {
    private final IJwtAuthenticationService jwtAuthenticationService;
    @PostMapping("/login")
    public JwtResponseDto authenticationAccount(@Valid @RequestBody LoginRequestDto loginRequestDto) {
        return jwtAuthenticationService.authenticationAccount(loginRequestDto);
    }
    @PostMapping("/register")
    public UserResponseDto registerAccount(@Valid @RequestBody RegisterRequestDto registerRequestDto){
        return jwtAuthenticationService.registerAccount(registerRequestDto);
    }
    @GetMapping
    public AuthUserResponseDto authUserResponseDto(@RequestHeader (name = "Authorization") String requestHeader){
        return jwtAuthenticationService.authRequestHeader(requestHeader);
    }

}
