package com.binh.carbooking.services.inf;

import com.binh.carbooking.dto.request.LocationRequestDto;
import com.binh.carbooking.dto.response.DeleteResponseDto;
import com.binh.carbooking.dto.response.LocationResponseDto;

import java.util.List;

public interface ILocationService {
    LocationResponseDto saveLocation(LocationRequestDto locationRequestDto);
    List<LocationResponseDto> getLocations();
    DeleteResponseDto deleteLocation(Long id);
}
