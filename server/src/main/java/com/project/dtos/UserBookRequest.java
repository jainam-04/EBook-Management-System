package com.project.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserBookRequest {
    private String title;
    private String author;
    private Double price;
    private String imageUrl;
}
