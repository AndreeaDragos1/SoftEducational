package com.example.backend.Controller;
//
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/auth")
//public class AuthController {
//
//    private final AuthenticationManager authenticationManager;
//    private final String SECRET_KEY = "secret";
//
//    public AuthController(AuthenticationManager authenticationManager) {
//        this.authenticationManager = authenticationManager;
//    }
//
//    @PostMapping("/login")
//    public Map<String, String> login(@RequestBody Map<String, String> request) {
//        try {
//            Authentication authenticate = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(request.get("username"), request.get("password"))
//            );
//
//            String token = Jwts.builder()
//                    .setSubject(request.get("username"))
//                    .setIssuedAt(new Date())
//                    .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 ore
//                    .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
//                    .compact();
//
//            Map<String, String> response = new HashMap<>();
//            response.put("token", token);
//            return response;
//
//        } catch (AuthenticationException e) {
//            throw new RuntimeException("Invalid credentials");
//        }
//    }
//}

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.security.Key;

@RestController
public class AuthController {

    private final Key secretKey;

    public AuthController(Key secretKey) {
        this.secretKey = secretKey;
    }

    @GetMapping("/api/user-info")
    public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization") String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();

        String username = claims.get("username", String.class);
        return ResponseEntity.ok().body(username);
    }
}
