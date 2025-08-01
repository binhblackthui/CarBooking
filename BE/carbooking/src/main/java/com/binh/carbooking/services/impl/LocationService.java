package com.binh.carbooking.services.impl;

import com.binh.carbooking.dto.request.LocationRequestDto;
import com.binh.carbooking.dto.response.DeleteResponseDto;
import com.binh.carbooking.dto.response.LocationResponseDto;
import com.binh.carbooking.entities.Location;
import com.binh.carbooking.repository.LocationRepo;
import com.binh.carbooking.services.inf.ILocationService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
    public List<LocationResponseDto> getLocations(){
        try{
            return locationRepo.findAll().stream().map(location -> modelMapper.map(location,LocationResponseDto.class)).collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }



    @Override
    public DeleteResponseDto deleteLocation(Long id){
        try{
            locationRepo.deleteById(id);
            return new DeleteResponseDto("delete success", HttpStatus.OK);
        } catch (Exception e) {
            return new DeleteResponseDto("delete fail",HttpStatus.BAD_REQUEST);
        }
    }
}
