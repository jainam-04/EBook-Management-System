package com.project.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartResponse {
    private Long id;
    private Long bookId;
    private String title;
    private String author;
    private Double price;
    private String imageUrl;
    private Integer quantity;
    private Double totalPrice;
}
