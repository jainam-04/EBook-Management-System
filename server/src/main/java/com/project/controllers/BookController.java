package com.project.controllers;

import com.project.dtos.BookRequest;
import com.project.dtos.BookResponse;
import com.project.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BookController {
    private final BookService service;

    @PostMapping("/add")
    public String addBook(@RequestBody BookRequest request){
        return service.addBook(request);
    }

    @GetMapping
    public List<BookResponse> getAllBooks(){
        return service.getAllBooks();
    }

    @GetMapping("/{id}")
    public BookResponse getBookById(@PathVariable Long id){
        return service.getBookById(id);
    }

    @GetMapping("/category/{category}")
    public List<BookResponse> getBooksByCategory(@PathVariable String category){
        return service.getBooksByCategory(category);
    }

    @GetMapping("/recent")
    public List<BookResponse> getRecentBooks(){
        return service.getRecentBooks();
    }

    @PutMapping("/{id}")
    public String updateBook(@PathVariable Long id, @RequestBody BookRequest request){
        return service.updateBook(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteBookById(@PathVariable Long id){
        return service.deleteBookById(id);
    }
}
