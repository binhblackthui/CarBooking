package com.binh.carbooking.controllers;


import com.binh.carbooking.dto.request.LocationRequestDto;
import com.binh.carbooking.dto.response.LocationResponseDto;
import com.binh.carbooking.repository.LocationRepo;
import com.binh.carbooking.services.inf.ILocationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/locations")

public class LocationController {
    private final ILocationService locationService;

    @PostMapping
    LocationResponseDto saveLocation(@Valid @RequestBody LocationRequestDto locationRequestDto){
        return locationService.saveLocation(locationRequestDto);
    }

}
