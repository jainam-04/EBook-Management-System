package com.project.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserBookResponse {
    private Long id;
    private String title;
    private String author;
    private Double price;
    private String category;
    private String status;
    private String imageUrl;
}
