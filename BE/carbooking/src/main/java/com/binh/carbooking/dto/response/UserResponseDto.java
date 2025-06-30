package com.binh.carbooking.dto.response;

import com.binh.carbooking.entities.enums.EGender;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
public class UserResponseDto {
    private Long id;
    private String fullName;
    private EGender gender;
    private Date dayOfBirth;
    private String phone;
    private String address;
    private String email;
    private LocalDateTime createAt;



}
