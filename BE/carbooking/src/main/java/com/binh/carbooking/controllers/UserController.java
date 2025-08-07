package com.binh.carbooking.controllers;

import com.binh.carbooking.dto.request.UserRequestDto;
import com.binh.carbooking.dto.response.*;
import com.binh.carbooking.services.inf.IBookingService;
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
    private final IBookingService bookingService;
    @GetMapping("/{id}")
    UserResponseDto getUser(@PathVariable Long id){return userService.findUserById(id); }

    @GetMapping
    PageResponse<UserResponseDto> getUserList(@RequestParam (name = "page") int page, @RequestParam(name = "size") int size){
        return userService.getUsers(page,size);
    }

    @PostMapping
    UserResponseDto saveUser(@Valid @RequestBody UserRequestDto userRequestDto){ return userService.saveUser(userRequestDto);}

    @PutMapping({"/{id}"})
    UserResponseDto updateUser(@PathVariable Long id, @Valid @RequestBody UserRequestDto userRequestDto){
        return userService.updateUser(userRequestDto, id);
    }

    @DeleteMapping("/{id}")
    DeleteResponseDto deleteUser(@PathVariable Long id){ return userService.deleteUserService(id); }



    @GetMapping("/{id}/bookings")
    PageResponse<BookingResponseDto> getListBookingByUser(@PathVariable Long id, @RequestParam("page") int page, @RequestParam("size") int size){
        return bookingService.getListBookingByUser(id,page,size);
    }

    @GetMapping("/{id}/bookings/{bookingId}")
    BookingResponseDto getBookingByUser(@PathVariable Long id, @PathVariable Long bookingId){
        return bookingService.getBookingByUser(id,bookingId);
    }

}
