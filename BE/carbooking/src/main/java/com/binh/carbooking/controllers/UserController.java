package com.binh.carbooking.controllers;

import com.binh.carbooking.dto.request.UserRequestDto;
import com.binh.carbooking.dto.response.DeleteResponseDto;
import com.binh.carbooking.dto.response.UserResponseDto;
import com.binh.carbooking.services.inf.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
;

@RestController
@Slf4j
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private IUserService userService;

    @GetMapping("/{id}")
    UserResponseDto getUser(@PathVariable Long id){return userService.findUserById(id); }

    @PostMapping
    UserResponseDto saveUser(@Valid @RequestBody UserRequestDto userRequestDto){ return userService.saveUser(userRequestDto);}

    @PutMapping({"/{id}"})
    UserResponseDto updateUser(@PathVariable Long id, @Valid @RequestBody UserRequestDto userRequestDto){
        return userService.updateUser(userRequestDto, id);
    }

    @DeleteMapping("/{id}")
    DeleteResponseDto deleteUser(@PathVariable Long id){ return userService.deleteUserService(id); }
}
