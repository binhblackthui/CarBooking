package com.binh.carbooking.services.impl;

import com.binh.carbooking.dto.request.CarDetailRequestDto;
import com.binh.carbooking.dto.response.CarDetailResponseDto;
import com.binh.carbooking.dto.response.DeleteResponseDto;
import com.binh.carbooking.entities.CarDetail;
import com.binh.carbooking.exceptions.ResourceFoundException;
import com.binh.carbooking.repository.CarDetailRepo;
import com.binh.carbooking.services.inf.ICarDetailService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
        CarDetail carDetail  = carDetailRepo.findById(id)
                .orElseThrow(()-> new ResourceFoundException("car detail not found"));
        return modelMapper.map(carDetail, CarDetailResponseDto.class);
    }
    @Override
    public List<CarDetailResponseDto> getListCarDetail(int page, int size){
        try{
            Pageable pageable = PageRequest.of(page,size);
            return carDetailRepo.findAll()
                    .stream()
                    .map(carDetail -> modelMapper.map(carDetail, CarDetailResponseDto.class))
                    .collect(Collectors.toList());

        }catch (Exception e)
        {
            throw new ResourceFoundException(e.getMessage());
        }
    }

    @Override
    public CarDetailResponseDto updateCarDetail(Long id,CarDetailRequestDto carDetailRequestDto){
        try{
            carDetailRepo.findById(id).ifPresent(carDetail -> {
                modelMapper.map(carDetailRequestDto,carDetail);
                carDetailRepo.save(carDetail);
            });
            return modelMapper.map(carDetailRequestDto, CarDetailResponseDto.class);
        }
        catch (Exception e){
            throw new ResourceFoundException("update fail");
        }

    }
    @Override
    public DeleteResponseDto deleteCarDetail(Long id){
        try{
            carDetailRepo.deleteById(id);
            return new DeleteResponseDto("delete success", HttpStatus.OK);
        } catch (Exception e) {
            return new DeleteResponseDto("delete fail",HttpStatus.BAD_REQUEST);
        }
    }
}
