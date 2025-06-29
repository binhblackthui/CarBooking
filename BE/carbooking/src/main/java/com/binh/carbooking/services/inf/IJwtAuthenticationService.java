package com.binh.carbooking.services.inf;

import com.binh.carbooking.dto.request.LoginRequest;
import com.binh.carbooking.dto.request.RegisterRequest;
import com.binh.carbooking.dto.response.AuthUserResponseDto;
import com.binh.carbooking.dto.response.JwtResponse;
import com.binh.carbooking.dto.response.UserResponse;

public interface IJwtAuthenticationService {
   JwtResponse authenticationAccount(LoginRequest loginRequest);
   //AuthUserResponseDto authRequestHeader(String token);
   UserResponse registerAccount(RegisterRequest registerRequest);
}
