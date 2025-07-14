package com.binh.carbooking.controllers;


import com.binh.carbooking.dto.request.CarRequestDto;
import com.binh.carbooking.dto.response.CarResponseDto;
import com.binh.carbooking.services.inf.ICarService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/cars")

public class CarController {
    private final ICarService carService;

    @PostMapping
    public CarResponseDto saveCar(@Valid @RequestBody CarRequestDto carRequestDto){
        return carService.saveCar(carRequestDto);
    }
    @GetMapping("/{id}")
    public CarResponseDto getCarById(@PathVariable Long id){
        return carService.getCarById(id);
    }
    @GetMapping
    public List<CarResponseDto> getListCar(@RequestParam (name = "page") int page,@RequestParam (name = "size") int size){
        return carService.getListCar(page, size);
    }
    @PutMapping("/{id}")
    public CarResponseDto updateCar(@PathVariable Long id,@Valid @RequestBody CarRequestDto carRequestDto){
        return carService.updateCar(id,carRequestDto);
    }
}
