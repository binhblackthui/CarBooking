package com.binh.carbooking.services.impl;

import com.binh.carbooking.dto.request.CarDetailRequestDto;
import com.binh.carbooking.dto.response.CarDetailResponseDto;
import com.binh.carbooking.entities.CarDetail;
import com.binh.carbooking.repository.CarDetailRepo;
import com.binh.carbooking.services.inf.ICarDetailService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor


public class CarDetailService implements ICarDetailService {
    private final ModelMapper modelMapper;
    private final CarDetailRepo carDetailRepo;
    @Override
    public CarDetailResponseDto saveCarDetail(CarDetailRequestDto carDetailRequestDto){
        CarDetail carDetail = modelMapper.map(carDetailRequestDto,CarDetail.class);
        return modelMapper.map(carDetailRepo.save(carDetail), CarDetailResponseDto.class);
    }
    @Override
    public CarDetailResponseDto getCarDetailById(Long id){
        return null;
    }
    @Override
    public List<CarDetailResponseDto> getListCarDetail(int page, int size){
        return null;
    }
    @Override
    public  List<CarDetailResponseDto> getCarDetail(CarDetailRequestDto carDetailRequestDto){
        return null;
    }
}
