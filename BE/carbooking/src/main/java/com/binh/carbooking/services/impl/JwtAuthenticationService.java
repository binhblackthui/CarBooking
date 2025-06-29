package com.binh.carbooking.services.impl;

import com.binh.carbooking.dto.request.LoginRequestDto;
import com.binh.carbooking.dto.response.AuthUserResponseDto;
import com.binh.carbooking.dto.response.JwtReponse;
import com.binh.carbooking.services.inf.IJwtAuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JwtAuthenticationService implements IJwtAuthenticationService {

    @Override
    public JwtReponse authenticationAccount(LoginRequestDto loginRequestDto) {
//        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken (loginRequestDto.getUsername(), loginRequestDto.getPassword()));
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String jwt="123";
        String username="binh@gmail.com";
        List<String> roles = Arrays.asList("1", "2");
        return new JwtReponse(HttpStatus.OK.value(),"login success",jwt,username,roles);
    }

    @Override
    public AuthUserResponseDto authRequestHeader(String token){
        return null;
    }

}
