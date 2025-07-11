package com.binh.carbooking.services.impl;

import com.binh.carbooking.dto.request.LocationRequestDto;
import com.binh.carbooking.dto.response.DeleteResponseDto;
import com.binh.carbooking.dto.response.LocationResponseDto;
import com.binh.carbooking.entities.Location;
import com.binh.carbooking.repository.LocationRepo;
import com.binh.carbooking.services.inf.ILocationService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationService implements ILocationService {
    private final ModelMapper modelMapper;
    private final LocationRepo locationRepo;

    @Override
    public LocationResponseDto saveLocation(LocationRequestDto locationRequestDto){
        Location location = modelMapper.map(locationRequestDto,Location.class);
        System.out.println("Request city: " + locationRequestDto.getCity());
        System.out.println("Entity city: " + location.getCity());
        return modelMapper.map(locationRepo.save(location),LocationResponseDto.class);
    }

    @Override
    public List<LocationResponseDto> getLocations(LocationRequestDto locationRequestDto){
        return null;
    }

    @Override
    public LocationRequestDto getLocationById(Long id){
        return null;
    }

    @Override
    public LocationResponseDto updateLocation(Long id, LocationRequestDto locationRequestDto){
        return null;
    }

    @Override
    public DeleteResponseDto deleteLocation(Long id){
        return null;
    }
}
