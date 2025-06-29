package com.binh.carbooking.controllers;

import com.binh.carbooking.dto.request.LoginRequest;
import com.binh.carbooking.dto.request.RegisterRequest;
import com.binh.carbooking.dto.response.JwtResponse;

import com.binh.carbooking.dto.response.UserResponse;
import com.binh.carbooking.services.inf.IJwtAuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("v1/auth")

public class AuthController {
    private final IJwtAuthenticationService jwtAuthenticationService;
    @PostMapping("/login")
    public JwtResponse authenticationAccount(@Valid @RequestBody LoginRequest loginRequest) {
        return jwtAuthenticationService.authenticationAccount(loginRequest);
    }
    @PostMapping("/register")
    public UserResponse registerAccount(@Valid @RequestBody RegisterRequest registerRequest){
        return jwtAuthenticationService.registerAccount(registerRequest);
    }

}
