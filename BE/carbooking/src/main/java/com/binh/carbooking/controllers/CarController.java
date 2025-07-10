package com.binh.carbooking.controllers;


import com.binh.carbooking.dto.request.CarRequestDto;
import com.binh.carbooking.dto.response.CarResponseDto;
import com.binh.carbooking.services.inf.ICarService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/cars")

public class CarController {
    private final ICarService carService;

    @PostMapping
    public CarResponseDto saveCar(@Valid @RequestBody CarRequestDto carRequestDto){
        return carService.saveCar(carRequestDto);
    }
}
