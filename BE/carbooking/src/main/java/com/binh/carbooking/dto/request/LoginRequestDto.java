package com.binh.carbooking.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginRequestDto {
    @NotBlank(message = "username or email")
    String username;
    @NotBlank(message = "password is require")
    String password;
}
