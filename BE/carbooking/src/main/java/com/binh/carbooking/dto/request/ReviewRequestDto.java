package com.binh.carbooking.dto.request;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRequestDto {
    private Long bookingId;
    private int star;
    private String feedback;
}
