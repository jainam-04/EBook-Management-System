package com.project.controllers;

import com.project.dtos.BookResponse;
import com.project.dtos.UserBookRequest;
import com.project.dtos.UserBookResponse;
import com.project.service.BookService;
import com.project.service.UserBookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/books")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BookController {
    private final BookService bookService;
    private final UserBookService userBookService;

    @PostMapping("/sell")
    public String sellBook(@RequestBody UserBookRequest request, @RequestHeader String email){
        return userBookService.sellBook(request, email);
    }

    @GetMapping
    public List<BookResponse> getAllBooks(){
        return bookService.getAllBooks();
    }

    @GetMapping("/{id}")
    public BookResponse getBookById(@PathVariable Long id){
        return bookService.getBookById(id);
    }

    @GetMapping("/my-books")
    public List<UserBookResponse> getBookBySellerEmail(@RequestHeader String email){
        return userBookService.getBooksBySellerEmail(email);
    }

    @GetMapping("/category/{category}")
    public List<BookResponse> getBooksByCategory(@PathVariable String category){
        return bookService.getBooksByCategory(category);
    }

    @GetMapping("/recent")
    public List<BookResponse> getRecentBooks(){
        return bookService.getRecentBooks();
    }

    @PutMapping("/{id}")
    public String updateBookById(
            @PathVariable Long id, @RequestBody UserBookRequest request, @RequestHeader String email
    ){
        return userBookService.updateBookById(id, request, email);
    }

    @DeleteMapping("/{id}")
    public String deleteBookById(@PathVariable Long id, @RequestHeader String email){
        return userBookService.deleteBookById(id, email);
    }
}
