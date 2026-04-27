package com.project.service;

import com.project.dtos.UserBookRequest;
import com.project.dtos.UserBookResponse;
import com.project.entities.Book;
import com.project.repositories.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserBookService {
    private final BookRepository repository;

    public String sellBook(UserBookRequest request, String email){
        Book book = Book.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .price(request.getPrice())
                .category("OLD")
                .status("Available")
                .sellerEmail(email)
                .imageUrl(request.getImageUrl())
                .createdAt(LocalDateTime.now())
                .build();
        repository.save(book);
        return "Book added for sale";
    }

    public List<UserBookResponse> getBooksBySellerEmail(String email){
        return repository.findBySellerEmail(email)
                .stream()
                .map(book -> UserBookResponse.builder()
                        .id(book.getId())
                        .title(book.getTitle())
                        .author(book.getAuthor())
                        .price(book.getPrice())
                        .category(book.getCategory())
                        .status(book.getStatus())
                        .imageUrl(book.getImageUrl())
                        .build()
                ).toList();
    }

    public String updateBookById(Long id, UserBookRequest request, String email){
        Book book = repository.findById(id).orElseThrow();
        if(!book.getSellerEmail().equals(email)){
            throw new RuntimeException("You can update only your own books");
        }
        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setPrice(request.getPrice());
        book.setImageUrl(request.getImageUrl());
        repository.save(book);
        return "Book Updated";
    }

    public String deleteBookById(Long id, String email){
        Book book = repository.findById(id).orElseThrow();
        if(!book.getSellerEmail().equals(email)){
            return "You can delete only your own books";
        }
        repository.deleteById(id);
        return "Book deleted";
    }
}
