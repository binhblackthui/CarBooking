package com.binh.carbooking.services.impl;

import com.binh.carbooking.dto.request.LoginRequest;
import com.binh.carbooking.dto.request.RegisterRequest;
import com.binh.carbooking.dto.response.AuthUserResponseDto;
import com.binh.carbooking.dto.response.JwtResponse;
import com.binh.carbooking.dto.response.UserResponse;
import com.binh.carbooking.entities.Role;
import com.binh.carbooking.entities.User;
import com.binh.carbooking.entities.enums.EGender;
import com.binh.carbooking.entities.enums.ERoleType;
import com.binh.carbooking.exceptions.DuplicateValueInResourceException;
import com.binh.carbooking.exceptions.ValidationException;
import com.binh.carbooking.filters.jwt.JwtUtil;
import com.binh.carbooking.filters.userprincal.UserPrinciple;
import com.binh.carbooking.repository.RoleRepo;
import com.binh.carbooking.repository.UserRepo;
import com.binh.carbooking.services.inf.IJwtAuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class JwtAuthenticationService implements IJwtAuthenticationService {
    private  final AuthenticationManager authenticationManager;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepo roleRepo;
    @Override
    public JwtResponse authenticationAccount(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
        String jwt= JwtUtil.generateJwtToken(authentication);
        String username="binh@gmail.com";
        List<String> roles = userPrinciple.getAuthorities().stream().map(grantedAuthority -> grantedAuthority.getAuthority()).collect(Collectors.toList());
        return new JwtResponse(HttpStatus.OK.value(),"login success",jwt,username,roles);
    }

    @Override
    public UserResponse registerAccount(RegisterRequest registerRequest){
        if(userRepo.findByEmail(registerRequest.getEmail())!=null)
            throw new DuplicateValueInResourceException("account was existed by email");
        if(!registerRequest.getPassword().equals(registerRequest.getConfirmPassword()))
            throw new ValidationException("confirm password not correct");
        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword())); // Mã hóa mật khẩu
        user.setFullName(registerRequest.getFullName()); // Giả sử RegisterRequest có trường fullName
        if(registerRequest.getGener().equals("MALE")) {
            user.setGender(EGender.MALE);
        }
        else {
            user.setGender(EGender.FEMALE);
        }
        user.setDayOfBirth(registerRequest.getDayOfBirth());
        user.setPhone(registerRequest.getPhone());
        user.setAddress(registerRequest.getAddress());
        user.setCreateAt(LocalDateTime.now());
        // Gán vai trò mặc định (ví dụ: ROLE_USER)
        Role role = roleRepo.findByRoleName(ERoleType.ROLE_USER);
        user.setRole(role);

        // Lưu user vào cơ sở dữ liệu
        User savedUser = userRepo.save(user);

        // Tạo UserResponse
        UserResponse userResponse = new UserResponse();

        userResponse.setId(savedUser.getId());
        userResponse.setEmail(savedUser.getEmail());
        userResponse.setFullName(savedUser.getFullName());
        userResponse.setGender(savedUser.getGender());
        userResponse.setDayOfBirth(savedUser.getDayOfBirth());
        userResponse.setPhone(savedUser.getPhone());
        userResponse.setAddress(savedUser.getAddress());
        userResponse.setCreateAt(savedUser.getCreateAt());



        return userResponse;
    }

}
