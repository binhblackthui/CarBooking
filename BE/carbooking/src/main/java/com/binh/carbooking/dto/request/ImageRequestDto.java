package com.binh.carbooking.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ImageRequestDto {
    @NotBlank(message = "image url is require")
    private String imageURL;
}
