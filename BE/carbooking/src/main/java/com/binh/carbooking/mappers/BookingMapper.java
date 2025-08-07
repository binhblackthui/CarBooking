package com.binh.carbooking.mappers;

import com.binh.carbooking.dto.request.BookingRequestDto;
import com.binh.carbooking.dto.response.BookingResponseDto;
import com.binh.carbooking.dto.response.ReviewResponseDto;
import com.binh.carbooking.dto.response.LocationResponseDto;
import com.binh.carbooking.dto.response.PaymentResponseDto;
import com.binh.carbooking.entities.Booking;
import com.binh.carbooking.repository.CarRepo;
import com.binh.carbooking.repository.LocationRepo;
import com.binh.carbooking.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Optional;


@Component
@RequiredArgsConstructor
public class BookingMapper {
    private final ModelMapper modelMapper;
    private final CarMapper carMapper;
    private final UserRepo userRepo;
    private final CarRepo carRepo;
    private final LocationRepo locationRepo;

    public BookingResponseDto mapEntityToDto(Booking booking){
        return BookingResponseDto.builder()
                .id(booking.getBookingId())
                .userId(booking.getUser().getId())
                .car(carMapper.mapEntityToDto(booking.getCar()))
                .pickupLocation(modelMapper.map(booking.getPickupLocation(),LocationResponseDto.class))
                .returnLocation(modelMapper.map(booking.getReturnLocation(),LocationResponseDto.class))
                .pickupTime(booking.getPickupTime())
                .returnTime(booking.getReturnTime())
                .customerName(booking.getCustomerName())
                .phone(booking.getPhone())
                .status(booking.getStatus())
                .createdAt(booking.getCreatedAt())
                .payment(modelMapper.map(booking.getPayment(),PaymentResponseDto.class))
                .review(    Optional.ofNullable(booking.getReview())
                        .map(comment -> modelMapper.map(comment, ReviewResponseDto.class))
                        .orElse(null))
                .build();
    }

    public Booking mapDtoToEntity(BookingRequestDto dto , Booking booking){
        booking.setUser(userRepo.getById(dto.getUserId()));
        booking.setCar(carRepo.getById(dto.getCarId()));
        booking.setPickupLocation(locationRepo.getById(dto.getPickupLocationId()));
        booking.setReturnLocation(locationRepo.getById(dto.getReturnLocationId()));
        booking.setPickupTime(dto.getPickupTime());
        booking.setReturnTime(dto.getReturnTime());
        booking.setStatus(dto.getStatus());
        booking.setCustomerName(dto.getCustomerName());
        booking.setPhone(dto.getPhone());
     return booking;
    }

}
