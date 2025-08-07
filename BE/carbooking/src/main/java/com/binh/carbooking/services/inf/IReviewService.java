package com.binh.carbooking.services.inf;

import com.binh.carbooking.dto.request.ReviewRequestDto;
import com.binh.carbooking.dto.response.PageResponse;
import com.binh.carbooking.dto.response.ReviewResponseDto;

public interface IReviewService {
    ReviewResponseDto saveReview(Long bookingId, ReviewRequestDto dto);
    PageResponse<ReviewResponseDto> getReviewsByCar (Long carId ,int page,int size);
}
