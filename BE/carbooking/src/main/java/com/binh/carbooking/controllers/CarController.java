package com.binh.carbooking.controllers;


import com.binh.carbooking.dto.request.CarRequestDto;
import com.binh.carbooking.dto.response.CarResponseDto;
import com.binh.carbooking.dto.response.DeleteResponseDto;
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
    public List<CarResponseDto> getCars(@RequestParam (name = "page") int page,@RequestParam (name = "size") int size){
        return carService.getCars(page, size);
    }

    @GetMapping("/overview")
    public Object getCarOverview(){
        return carService.getCarOverview();
    }
    @GetMapping("/available")
    public List<CarResponseDto> getAvailableCars(@RequestParam (name = "page") int page,@RequestParam (name = "size") int size)
    {
        return carService.getAvailableCars(page,size);
    }
    @GetMapping("/total")
    public Object totalCarsByStatus(@RequestParam(name = "status") String status){
        return carService.totalCarsByStatus(status);
    }
    @PutMapping("/{id}")
    public CarResponseDto updateCar(@PathVariable Long id,@Valid @RequestBody CarRequestDto carRequestDto){
        return carService.updateCar(id,carRequestDto);
    }

    @DeleteMapping("/{id}")
    public DeleteResponseDto deleteCar(@PathVariable Long id){
        return carService.deleteCar(id);
    }
}
