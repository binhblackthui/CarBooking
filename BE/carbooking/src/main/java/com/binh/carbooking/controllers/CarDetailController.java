package com.binh.carbooking.controllers;

import com.binh.carbooking.dto.request.CarDetailRequestDto;
import com.binh.carbooking.dto.response.CarDetailResponseDto;
import com.binh.carbooking.dto.response.DeleteResponseDto;
import com.binh.carbooking.services.inf.ICarDetailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/carDetail")
public class CarDetailController {
    private final ICarDetailService carDetailService;
    @PostMapping
    CarDetailResponseDto saveCarDetail(@Valid @RequestBody CarDetailRequestDto carDetailRequestDto){
        return carDetailService.saveCarDetail(carDetailRequestDto);
    }
    @GetMapping
    List<CarDetailResponseDto> getListCarDetail(@RequestParam (name = "page") int page,@RequestParam(name = "size") int size){
        return carDetailService.getListCarDetail();
    }
    @GetMapping("/{id}")
    CarDetailResponseDto getCarDetailById(@PathVariable Long id){
        return carDetailService.getCarDetailById(id);
    }
    @PutMapping("/{id}")
    CarDetailResponseDto updateCarDetail(@PathVariable Long id,@Valid @RequestBody CarDetailRequestDto carDetailRequestDto){
        return carDetailService.updateCarDetail(id,carDetailRequestDto);
    }
    @DeleteMapping("/{id}")
    DeleteResponseDto deleteCarDetail(@PathVariable Long id){
        return carDetailService.deleteCarDetail(id);
    }
}
