package com.binh.carbooking.dto.request;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewRequestDto {
    private Long userId;
    private Long carId;
    private int stars;
    private String comment;
}
