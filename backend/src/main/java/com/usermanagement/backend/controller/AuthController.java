package com.usermanagement.backend.controller;

import com.usermanagement.backend.dto.LoginRequest;
import com.usermanagement.backend.dto.LoginResponse;

import com.usermanagement.backend.model.User;

import com.usermanagement.backend.repository.UserRepository;

import com.usermanagement.backend.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")

@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // =========================
    // REGISTER
    // =========================

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody User user
    ) {

        // CHECK EMAIL EXISTS
        if (
            userRepository.findByEmail(user.getEmail())
            .isPresent()
        ) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Email already exists");
        }

        // ENCRYPT PASSWORD
        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()
                )
        );

        // SAVE USER
        userRepository.save(user);

        return ResponseEntity.ok(
                "User registered successfully"
        );
    }

    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request
    ) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid Email");
        }

        // CHECK ENCRYPTED PASSWORD
        if (
            !passwordEncoder.matches(
                    request.getPassword(),
                    user.getPassword()
            )
        ) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid Password");
        }

        String token = jwtUtil.generateToken(
                user.getEmail()
        );

        return ResponseEntity.ok(
                new LoginResponse(token)
        );
    }
}