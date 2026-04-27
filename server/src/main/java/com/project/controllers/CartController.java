package com.project.controllers;

import com.project.dtos.CartRequest;
import com.project.dtos.CartResponse;
import com.project.dtos.UpdateQuantityRequest;
import com.project.security.JwtService;
import com.project.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CartController {
    private final CartService cartService;

    @PostMapping("/add")
    public String addToCart(@RequestHeader("email") String email, @RequestBody CartRequest request){
        return cartService.addToCart(email, request);
    }

    @GetMapping
    public List<CartResponse> getCart(@RequestHeader("email") String email){
        return cartService.getCart(email);
    }

    @PutMapping("/{id}")
    public String updateQuantity(@PathVariable Long id, @RequestBody UpdateQuantityRequest request){
        return cartService.updateQuantity(id, request.getQuantity());
    }

    @DeleteMapping("/{id}")
    public String removeItem(@PathVariable Long id){
        return cartService.removeItem(id);
    }

    @DeleteMapping("/clear")
    public String clear(@RequestHeader("email") String email){
        return cartService.clearCart(email);
    }
}
