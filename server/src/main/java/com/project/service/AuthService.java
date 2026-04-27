package com.project.service;

import com.project.dtos.AuthResponse;
import com.project.dtos.LoginRequest;
import com.project.dtos.RegisterRequest;
import com.project.entities.User;
import com.project.repositories.UserRepository;
import com.project.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository repository;
    private final PasswordEncoder encoder;
    private final JwtService service;

    public String register(RegisterRequest request){
        if(repository.findByEmail(request.getEmail()).isPresent()){
            throw new RuntimeException("Email already exists");
        }
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .mobileNo(request.getMobileNo())
                .role("USER")
                .build();
        repository.save(user);
        return "User registered successfully";
    }

    public AuthResponse login(LoginRequest request){
        User user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if(!encoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException("Invalid credentials");
        }
        String token = service.generateToken(user.getEmail());
        return new AuthResponse(token, user.getRole(), user.getEmail());
    }
}
