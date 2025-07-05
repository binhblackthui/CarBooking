package com.binh.carbooking.dto.request;

import com.binh.carbooking.entities.enums.EGender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class UserRequestDto {

    @NotBlank(message = "fullName is require")
    private String fullName;
    @NotBlank(message = "phone is require")
    private String phone;
    @Email
    @NotBlank(message = "email is require")
    private String email;
    @NotBlank(message = "password is require")
    private String password;
    @NotBlank(message = "address is require")
    private String address;
    private EGender gender;
    private Date dayOfBirth;
}
