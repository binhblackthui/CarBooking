package com.binh.carbooking.dto.response;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class DeleteResponseDto {
    private String message;
    private int status;
    private final HttpStatus httpStatus;

    public DeleteResponseDto(String message, HttpStatus httpStatus){
        this.message =message;
        this.status = httpStatus.value();
        this.httpStatus = httpStatus;
    }
}
