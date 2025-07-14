package com.binh.carbooking.services.impl;

import com.binh.carbooking.dto.response.BookingResponseDto;
import com.binh.carbooking.exceptions.ResourceFoundException;
import com.binh.carbooking.mappers.BookingMapper;
import com.binh.carbooking.repository.BookingRepo;
import com.binh.carbooking.services.inf.IBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService implements IBookingService {
    private final BookingRepo bookingRepo;
    private final BookingMapper bookingMapper;
    @Override
    public List<BookingResponseDto> getListBookingByUser(Long id, int page, int size){
        try{
            Pageable pageable = PageRequest.of(page,size);
            return bookingRepo.getListBookingByUser(id,pageable)
                    .stream()
                    .map(booking -> bookingMapper.mapEntityToDto(booking))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new ResourceFoundException(e.getMessage());
        }
    }
}
