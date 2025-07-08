package com.binh.carbooking.controllers;

import com.binh.carbooking.dto.request.UserRequestDto;
import com.binh.carbooking.dto.response.CarResponseDto;
import com.binh.carbooking.dto.response.DeleteResponseDto;
import com.binh.carbooking.dto.response.UserResponseDto;
import com.binh.carbooking.services.inf.ICarService;
import com.binh.carbooking.services.inf.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;
    private final ICarService carService;

    @GetMapping("/{id}")
    UserResponseDto getUser(@PathVariable Long id){return userService.findUserById(id); }

    @GetMapping
    List<UserResponseDto> getUserList(@RequestParam (name = "page") int page, @RequestParam(name = "size") int size){
        return userService.findUserList(page,size);
    }

    @PostMapping
    UserResponseDto saveUser(@Valid @RequestBody UserRequestDto userRequestDto){ return userService.saveUser(userRequestDto);}

    @PutMapping({"/{id}"})
    UserResponseDto updateUser(@PathVariable Long id, @Valid @RequestBody UserRequestDto userRequestDto){
        return userService.updateUser(userRequestDto, id);
    }

    @DeleteMapping("/{id}")
    DeleteResponseDto deleteUser(@PathVariable Long id){ return userService.deleteUserService(id); }

    @GetMapping("{id}/Cars")
    List<CarResponseDto> getListCarByUser(@PathVariable Long id, @RequestParam("page") int page, @RequestParam("size") int size){
        return carService.getListCarByUser(id,page,size);
    }

}
