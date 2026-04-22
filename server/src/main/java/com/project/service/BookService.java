package com.project.service;

import com.project.dtos.BookRequest;
import com.project.dtos.BookResponse;
import com.project.entities.Book;
import com.project.repositories.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository repository;

    public String addBook(BookRequest request){
        Book book = Book.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .price(request.getPrice())
                .category(request.getCategory())
                .status("Available")
                .imageUrl(request.getImageUrl())
                .sellerEmail("admin@gmail.com")
                .createdAt(LocalDateTime.now())
                .build();
        repository.save(book);
        return "Book added successfully";
    }

    public List<BookResponse> getAllBooks(){
        return repository.findAll()
                .stream()
                .map(book -> BookResponse.builder()
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

    public BookResponse getBookById(Long id){
        Book book = repository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
        return BookResponse.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .price(book.getPrice())
                .category(book.getCategory())
                .status(book.getStatus())
                .imageUrl(book.getImageUrl())
                .build();
    }

    public List<BookResponse> getBooksByCategory(String category){
        return repository.findByCategoryIgnoreCase(category)
                .stream()
                .map(book -> BookResponse.builder()
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

    public List<BookResponse> getRecentBooks(){
        return repository.findTop8ByOrderByCreatedAtDesc()
                .stream()
                .map(book -> BookResponse.builder()
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

    public String updateBook(Long id, BookRequest request){
        Book book = repository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setPrice(request.getPrice());
        book.setCategory(request.getCategory());
        book.setImageUrl(request.getImageUrl());
        repository.save(book);
        return "Book updated successfully";
    }

    public String deleteBookById(Long id){
        repository.deleteById(id);
        return "Book deleted successfully";
    }
}
