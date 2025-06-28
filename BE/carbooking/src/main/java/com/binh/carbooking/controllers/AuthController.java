package com.binh.carbooking.controllers;

import com.binh.carbooking.dto.request.LoginRequestDto;
import com.binh.carbooking.dto.response.AuthUserResponseDto;
import com.binh.carbooking.dto.response.JwtReponse;
import com.binh.carbooking.services.impl.JwtAuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("v1/auth")

public class AuthController {
    private final JwtAuthenticationService jwtAuthenticationService;
    @PostMapping("/login")
    public JwtReponse authenticationAccount(@Valid @RequestBody LoginRequestDto loginRequestDto) {
        return jwtAuthenticationService.authenticationAccount(loginRequestDto);
    }
    @GetMapping
    AuthUserResponseDto authUserRequest(@RequestHeader(name = "Authorization") String requestHeader)
    {
        return null;
    }

}
