package com.example.backend.Service;


import com.example.backend.Model.User;
import com.example.backend.Repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Generare o cheie sigură folosind Keys.secretKeyFor
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public User registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword())); // Criptare parolă
        return userRepository.save(user);
    }

    public String authenticateUser(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty() || !new BCryptPasswordEncoder().matches(password, user.get().getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        // Generare token JWT cu username în payload
        return Jwts.builder()
                .setSubject(username) // Setăm username ca subiect
                .claim("username", username) // Adăugăm username ca un claim
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 oră
                .signWith(SECRET_KEY)
                .compact();
    }
}