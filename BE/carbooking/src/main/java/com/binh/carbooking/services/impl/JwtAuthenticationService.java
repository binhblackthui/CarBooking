package com.binh.carbooking.services.impl;

import com.binh.carbooking.dto.request.LoginRequestDto;
import com.binh.carbooking.dto.request.RegisterRequestDto;
import com.binh.carbooking.dto.response.AuthUserResponseDto;
import com.binh.carbooking.dto.response.JwtResponseDto;
import com.binh.carbooking.dto.response.UserResponseDto;
import com.binh.carbooking.entities.Admin;
import com.binh.carbooking.entities.Role;
import com.binh.carbooking.entities.User;
import com.binh.carbooking.entities.enums.EGender;
import com.binh.carbooking.entities.enums.ERoleType;
import com.binh.carbooking.exceptions.DuplicateValueInResourceException;
import com.binh.carbooking.exceptions.ValidationException;
import com.binh.carbooking.filters.jwt.JwtUtil;
import com.binh.carbooking.filters.userprincal.UserPrinciple;
import com.binh.carbooking.repository.AdminRepo;
import com.binh.carbooking.repository.RoleRepo;
import com.binh.carbooking.repository.UserRepo;
import com.binh.carbooking.services.inf.IJwtAuthenticationService;
import lombok.RequiredArgsConstructor;
import org.hibernate.boot.jaxb.mapping.JaxbQueryHint;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class JwtAuthenticationService implements IJwtAuthenticationService {
    private  final AuthenticationManager authenticationManager;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepo roleRepo;
    private final AdminRepo adminRepo;
    @Override
    public JwtResponseDto authenticationAccount(LoginRequestDto loginRequestDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestDto.getUsername(), loginRequestDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
        String jwt= JwtUtil.generateJwtToken(authentication);

        List<String> roles = userPrinciple.getAuthorities().stream().map(grantedAuthority -> grantedAuthority.getAuthority()).collect(Collectors.toList());
        return new JwtResponseDto(HttpStatus.OK.value(),"login success",jwt,userPrinciple.getUsername(),roles);
    }

    @Override
    public UserResponseDto registerAccount(RegisterRequestDto registerRequestDto){
        if(userRepo.findByEmail(registerRequestDto.getEmail())!=null)
            throw new DuplicateValueInResourceException("account was existed by email");
        if(!registerRequestDto.getPassword().equals(registerRequestDto.getConfirmPassword()))
            throw new ValidationException("confirm password not correct");
        User user = new User();
        user.setEmail(registerRequestDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequestDto.getPassword())); // Mã hóa mật khẩu
        user.setFullName(registerRequestDto.getFullName()); // Giả sử RegisterRequestDto có trường fullName
        if(registerRequestDto.getGener().equals("MALE")) {
            user.setGender(EGender.MALE);
        }
        else {
            user.setGender(EGender.FEMALE);
        }
        user.setDayOfBirth(registerRequestDto.getDayOfBirth());
        user.setPhone(registerRequestDto.getPhone());
        user.setAddress(registerRequestDto.getAddress());
        user.setCreateAt(LocalDateTime.now());
        // Gán vai trò mặc định (ví dụ: ROLE_USER)
        Role role = roleRepo.findByRoleName(ERoleType.ROLE_USER);
        user.setRole(role);

        // Lưu user vào cơ sở dữ liệu
        User savedUser = userRepo.save(user);

        // Tạo UserResponseDto
        UserResponseDto userResponseDto = new UserResponseDto();

        userResponseDto.setId(savedUser.getId());
        userResponseDto.setEmail(savedUser.getEmail());
        userResponseDto.setFullName(savedUser.getFullName());
        userResponseDto.setGender(savedUser.getGender());
        userResponseDto.setDayOfBirth(savedUser.getDayOfBirth());
        userResponseDto.setPhone(savedUser.getPhone());
        userResponseDto.setAddress(savedUser.getAddress());
        userResponseDto.setCreateAt(savedUser.getCreateAt());



        return userResponseDto;
    }

    @Override
    public AuthUserResponseDto authRequestHeader(String token)
    {
        if(JwtUtil.getRoleByToken(token).equals("ROLE_USER")){
            User user =userRepo.findByEmail(JwtUtil.getUsernameByToken((token)));
            return new AuthUserResponseDto(
                    200,
                    user.getId(),
                    user.getFullName(),
                    "ROLE_USER",
                    user.getGender().toString(),
                    user.getDayOfBirth(),
                    user.getPhone(),
                    user.getEmail(),
                    user.getAddress()
            );
        }
        else {
            Admin admin = adminRepo.findByAdminName(JwtUtil.getUsernameByToken(token));
            return new AuthUserResponseDto(
                    200,
                    admin.getAdminId(),
                    admin.getAdminName(),
                    "ROLE_ADMIN",
                    "",
                    null,
                    "",
                    "",""
            );
        }
    }

}
