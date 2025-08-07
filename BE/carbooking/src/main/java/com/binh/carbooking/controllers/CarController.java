package com.binh.carbooking.controllers;


import com.binh.carbooking.dto.request.CarRequestDto;
import com.binh.carbooking.dto.response.CarResponseDto;
import com.binh.carbooking.dto.response.DeleteResponseDto;
import com.binh.carbooking.dto.response.PageResponse;
import com.binh.carbooking.dto.response.ReviewResponseDto;
import com.binh.carbooking.services.inf.ICarService;
import com.binh.carbooking.services.inf.IReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/cars")

public class CarController {
    private final ICarService carService;
    private final IReviewService reviewService;
    @PostMapping
    public CarResponseDto saveCar(@Valid @RequestBody CarRequestDto carRequestDto){
        return carService.saveCar(carRequestDto);
    }

    @GetMapping("/{id}")
    public CarResponseDto getCarById(@PathVariable Long id){
        return carService.getCarById(id);
    }

    @GetMapping
    public PageResponse<CarResponseDto> getCars(@RequestParam (name = "page") int page, @RequestParam (name = "size") int size){
        return carService.getCars(page, size);
    }



    @GetMapping("/search")
    PageResponse<CarResponseDto> searchCars(@RequestParam (name = "page") int page,
                                    @RequestParam (name = "size") int size,
                                    @RequestParam (name ="status",defaultValue = "AVAILABLE") String status,
                                    @RequestParam(required = false) Long location,
                                    @RequestParam(name = "pickup_date", required = false) LocalDate pickupDate,
                                    @RequestParam(name = "return_date", required = false) LocalDate returnDate){
        System.out.println(page);
        return carService.searchCars(page,size,status,location,pickupDate,returnDate);
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

    @GetMapping("/{carId}/reviews")
    public PageResponse<ReviewResponseDto> getReviewByCar(@PathVariable Long carId,@RequestParam (name = "page") int page,@RequestParam(name ="size")int size){
        return reviewService.getReviewsByCar(carId,page,size);
    }
}
