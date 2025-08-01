package com.binh.carbooking.controllers;


import com.binh.carbooking.dto.request.LocationRequestDto;
import com.binh.carbooking.dto.response.DeleteResponseDto;
import com.binh.carbooking.dto.response.LocationResponseDto;
import com.binh.carbooking.services.inf.ILocationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/locations")

public class LocationController {
    private final ILocationService locationService;

    @PostMapping
    LocationResponseDto saveLocation(@Valid @RequestBody LocationRequestDto locationRequestDto){
        return locationService.saveLocation(locationRequestDto);
    }
    @GetMapping
    List<LocationResponseDto> getLocations(){
        return locationService.getLocations();
    }

    @DeleteMapping
    DeleteResponseDto deleteLocation(@PathVariable Long id){
        return locationService.deleteLocation(id);
    }

}
