package com.binh.carbooking.services.inf;

import com.binh.carbooking.dto.request.BookingRequestDto;
import com.binh.carbooking.dto.response.BookingResponseDto;
import com.binh.carbooking.dto.response.PageResponse;
import com.binh.carbooking.repository.BookingRepo;

import java.awt.print.Book;
import java.util.List;

public interface IBookingService {
    BookingResponseDto saveBooking(BookingRequestDto bookingRequestDto);

;

    PageResponse<BookingResponseDto> getBookings(int page, int size);

    PageResponse<BookingResponseDto> getListBookingByUser(Long id, int page, int size);

    BookingResponseDto getBookingById(Long id);

    BookingResponseDto getBookingByUser(Long id, Long bookingId);

    BookingResponseDto updateBooking(Long id, BookingRequestDto bookingRequestDto);

    boolean isExistBooking(Long id);

    Object totalBookingByStatus(String status);

}
