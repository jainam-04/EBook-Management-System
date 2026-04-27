package com.project.service;

import com.project.dtos.CartRequest;
import com.project.dtos.CartResponse;
import com.project.entities.Book;
import com.project.entities.Cart;
import com.project.repositories.BookRepository;
import com.project.repositories.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final BookRepository bookRepository;

    public String addToCart(String email, CartRequest request){
        Cart cart = cartRepository.findByUserEmailAndBookId(email, request.getBookId()).orElse(null);
        if(cart != null){
             cart.setQuantity(cart.getQuantity() + request.getQuantity());
             cartRepository.save(cart);
             return "Quantity updated";
        }
        Book book = bookRepository.findById(request.getBookId()).orElseThrow(() -> new RuntimeException("Book not found"));
        Cart newCart = Cart.builder()
                .userEmail(email)
                .book(book)
                .quantity(request.getQuantity())
                .build();
        cartRepository.save(newCart);
        return "Added to Cart";
    }

    public List<CartResponse> getCart(String email){
        return cartRepository.findByUserEmail(email)
                .stream()
                .map(c -> new CartResponse(
                        c.getId(),
                        c.getBook().getId(),
                        c.getBook().getTitle(),
                        c.getBook().getAuthor(),
                        c.getBook().getPrice(),
                        c.getBook().getImageUrl(),
                        c.getQuantity(),
                        c.getBook().getPrice() * c.getQuantity()
                )).toList();
    }

    public String updateQuantity(Long cartId, Integer quantity){
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));
        cart.setQuantity(quantity);
        cartRepository.save(cart);
        return "Quantity updated";
    }

    public String removeItem(Long cartId){
        cartRepository.deleteById(cartId);
        return "Removed from cart";
    }

    public String clearCart(String email){
        List<Cart> items = cartRepository.findByUserEmail(email);
        cartRepository.deleteAll(items);
        return "Cart cleared";
    }
}
