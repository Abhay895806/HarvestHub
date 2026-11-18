package com.hcl.harvesthub.controller;

import com.hcl.harvesthub.model.User;
import com.hcl.harvesthub.service.AuthService;
import com.hcl.harvesthub.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    public AuthController(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User savedUser = authService.register(user);

            return ResponseEntity.ok(Map.of(
                    "message", "Registration successful!",
                    "name", savedUser.getFullName(),
                    "email", savedUser.getEmail()
            ));

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage())
            );
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        try {
            User user = authService.login(
                    request.get("email"),
                    request.get("password")
            );

            return ResponseEntity.ok(Map.of(
                    "message", "Login successful!",
                    "name", user.getFullName(),
                    "email", user.getEmail(),
                    "token", jwtService.createToken(user.getEmail())
            ));

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage())
            );
        }
    }
}
