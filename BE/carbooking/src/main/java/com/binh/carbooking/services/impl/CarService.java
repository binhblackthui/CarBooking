package com.binh.carbooking.services.impl;

import com.binh.carbooking.dto.response.CarResponseDto;
import com.binh.carbooking.mappers.CarMapper;
import com.binh.carbooking.repository.CarRepo;
import com.binh.carbooking.services.inf.ICarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CarService implements ICarService {
    private final CarRepo carRepo;
    private final CarMapper carMapper;
    @Override
    public List<CarResponseDto> getListCarByUser(Long userID, int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return carRepo.getListCarByUser(userID,pageable)
                .stream()
                .map(car -> carMapper.mapEntityToDto(car))
                .collect(Collectors.toList());
    }

}
