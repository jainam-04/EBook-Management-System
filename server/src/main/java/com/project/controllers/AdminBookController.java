package com.project.controllers;

import com.project.dtos.BookRequest;
import com.project.dtos.BookResponse;
import com.project.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/books")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminBookController {
    private final BookService service;

    @PostMapping("/add")
    public String addBook(@RequestBody BookRequest request){
        return service.addBook(request);
    }

    @GetMapping("/{id}")
    public BookResponse getBookById(@PathVariable Long id){
        return service.getBookById(id);
    }

    @GetMapping
    public List<BookResponse> getAllBooks(){
        return service.getAllBooks();
    }

    @PutMapping("/update/{id}")
    public String updateBook(@PathVariable Long id, @RequestBody BookRequest request){
        return service.updateBook(id, request);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteBookById(@PathVariable Long id){
        return service.deleteBookById(id);
    }
}
