package com.project.repositories;

import com.project.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByCategoryIgnoreCase(String category);
    List<Book> findByStatusIgnoreCase(String status);
    List<Book> findTop8ByOrderByCreatedAtDesc();
    List<Book> findBySellerEmail(String email);
}
