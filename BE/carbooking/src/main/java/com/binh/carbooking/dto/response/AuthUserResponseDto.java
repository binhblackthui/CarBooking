package com.binh.carbooking.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
@AllArgsConstructor
public class AuthUserResponseDto {
    private int status;
    private Long userId;
    private String fullName;
    private String roleName;
    private String phone;
    private String email;
}
