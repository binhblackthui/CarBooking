package com.binh.carbooking.services.impl;

import com.binh.carbooking.dto.request.LoginRequestDto;
import com.binh.carbooking.dto.response.AuthUserResponseDto;
import com.binh.carbooking.dto.response.JwtResponse;
import com.binh.carbooking.filters.jwt.JwtUtil;
import com.binh.carbooking.filters.userprincal.UserPrinciple;
import com.binh.carbooking.services.inf.IJwtAuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JwtAuthenticationService implements IJwtAuthenticationService {
    private  final AuthenticationManager authenticationManager;

    @Override
    public JwtResponse authenticationAccount(LoginRequestDto loginRequestDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestDto.getUsername(), loginRequestDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
        String jwt= JwtUtil.generateJwtToken(authentication);
        String username="binh@gmail.com";
        List<String> roles = userPrinciple.getAuthorities().stream().map(grantedAuthority -> grantedAuthority.getAuthority()).collect(Collectors.toList());
        return new JwtResponse(HttpStatus.OK.value(),"login success",jwt,username,roles);
    }

    @Override
    public AuthUserResponseDto authRequestHeader(String token){
        return null;
    }

}
