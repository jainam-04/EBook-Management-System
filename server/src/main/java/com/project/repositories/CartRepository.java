package com.project.repositories;

import com.project.entities.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUserEmail(String email);
    Optional<Cart> findByUserEmailAndBookId(String email, Long bookId);
}
