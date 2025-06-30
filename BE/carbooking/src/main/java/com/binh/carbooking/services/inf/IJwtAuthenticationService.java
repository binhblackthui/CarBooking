package com.binh.carbooking.services.inf;

import com.binh.carbooking.dto.request.LoginRequestDto;
import com.binh.carbooking.dto.request.RegisterRequestDto;
import com.binh.carbooking.dto.response.JwtResponseDto;
import com.binh.carbooking.dto.response.UserResponseDto;

public interface IJwtAuthenticationService {
   JwtResponseDto authenticationAccount(LoginRequestDto loginRequestDto);
   //AuthUserResponseDto authRequestHeader(String token);
   UserResponseDto registerAccount(RegisterRequestDto registerRequestDto);
}
