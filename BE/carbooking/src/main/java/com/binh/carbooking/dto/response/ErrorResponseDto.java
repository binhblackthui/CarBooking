package com.binh.carbooking.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.ZonedDateTime;
import java.util.Map;

@Getter
@Setter
@RequiredArgsConstructor
public class ErrorResponseDto {
    int statusCode;
    String message;
    String description;
    ZonedDateTime timestamp;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    Map<String, String> validationErrors;

    public ErrorResponseDto(int statusCode, String message, String description, ZonedDateTime timestamp) {
        this.statusCode = statusCode;
        this.message = message;
        this.description = description;
        this.timestamp = timestamp;
    }
}
