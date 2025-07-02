package com.binh.carbooking.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@Builder
@AllArgsConstructor
public class AuthUserResponseDto {
    private int status;
    private Long userId;
    private String fullName;
    private String roleName;
    private String gener;
    private Date birthOfDay;
    private String phone;
    private String email;
    private String address;
}
