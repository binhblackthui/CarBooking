package com.binh.carbooking.services.inf;

import com.binh.carbooking.dto.request.LoginRequestDto;
import com.binh.carbooking.dto.response.AuthUserResponseDto;
import com.binh.carbooking.dto.response.JwtResponse;

public interface IJwtAuthenticationService {
   JwtResponse authenticationAccount(LoginRequestDto loginRequestDto);
   AuthUserResponseDto authRequestHeader(String token);

}
