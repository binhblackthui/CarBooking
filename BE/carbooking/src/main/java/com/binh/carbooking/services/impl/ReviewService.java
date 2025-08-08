package com.binh.carbooking.services.impl;

import com.binh.carbooking.dto.request.ReviewRequestDto;
import com.binh.carbooking.dto.response.PageResponse;
import com.binh.carbooking.dto.response.ReviewResponseDto;
import com.binh.carbooking.entities.Review;
import com.binh.carbooking.exceptions.ResourceNotFoundException;
import com.binh.carbooking.exceptions.ValidationException;
import com.binh.carbooking.repository.BookingRepo;
import com.binh.carbooking.repository.CarRepo;
import com.binh.carbooking.repository.ReviewRepo;
import com.binh.carbooking.repository.UserRepo;
import com.binh.carbooking.services.inf.IReviewService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ReviewService implements IReviewService {
    private final ReviewRepo reviewRepo;
    private final ModelMapper modelMapper;
    private final UserRepo userRepo;
    private final CarRepo carRepo;
    private final BookingRepo bookingRepo;
    @Override
    public ReviewResponseDto saveReview(Long id, ReviewRequestDto dto){
        if(bookingRepo.findById(id).isEmpty()){
            throw new ResourceNotFoundException("booking not exist");
        }
        try {
            Review review = new Review();
            review.setBooking(bookingRepo.getById(id));
            review.setUser(userRepo.getById(dto.getUserId()));
            review.setCar(carRepo.getById(dto.getCarId()));
            review.setStars(dto.getStars());
            review.setComment(dto.getComment());
            review.setCreatedAt(LocalDateTime.now());
            Review saveReview = reviewRepo.save(review);
            return modelMapper.map(saveReview,ReviewResponseDto.class);
        } catch (Exception e) {
            throw new ValidationException(e.getMessage());
        }
    }

    @Override
    public PageResponse<ReviewResponseDto>  getReviewsByCar(Long carId,int page, int size){
        try{
            Pageable pageable = PageRequest.of(page,size);
            Page<Review> reviews = reviewRepo.getReviewsByCar(pageable,carId);
            return new PageResponse<>(
                    reviews.getContent().stream().map(review -> modelMapper.map(review,ReviewResponseDto.class)).collect(Collectors.toList()),
                    reviews.getNumber(),
                    reviews.getTotalPages(),
                    reviews.getNumberOfElements(),
                    reviews.getSize()
            );

        }
        catch (Exception e){
            throw new ResourceNotFoundException(e.getMessage());
        }

    }

}
