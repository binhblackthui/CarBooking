package com.binh.carbooking.services.inf;

import com.binh.carbooking.dto.response.BookingResponseDto;

import java.util.List;

public interface IBookingService {
    List<BookingResponseDto> getListBookingByUser(Long id, int page, int size);
}
