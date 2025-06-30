package com.binh.carbooking.dto.request;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
@RequiredArgsConstructor
public class RegisterRequestDto {
    @NotBlank(message = "fullName is require")
    String fullName;
    @NotBlank(message = "gener is require")
    String gener;
    @NotNull(message = "dayOfBirth is required")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) // Nếu binding từ form-data, thường với @RequestParam
    @JsonFormat(pattern = "yyyy-MM-dd") // Nếu binding từ JSON
    private Date dayOfBirth;
    @NotBlank(message = "phone is require")
    String phone;
    @NotBlank(message = "address is require")
    String address;
    @Email(message = "not valid email")
    @NotBlank(message = "email is require")
    String email;
    @NotBlank(message = "password is require")
    String password;
    @NotBlank(message = "confirm password is require")
    String confirmPassword;
}
