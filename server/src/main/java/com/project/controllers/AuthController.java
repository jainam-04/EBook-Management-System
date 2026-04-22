package com.project.controllers;

import com.project.dtos.AuthResponse;
import com.project.dtos.LoginRequest;
import com.project.dtos.RegisterRequest;
import com.project.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {
    private final AuthService service;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request){
        return service.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request){
        return service.login(request);
    }
}
