package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Permite toate rutele
                        .allowedOrigins("http://localhost:5173") // Permite frontend-ul local
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Metode HTTP permise
                        .allowedHeaders("*") // Permite toate headerele
                        .allowCredentials(true); // Permite trimiterea de cookies sau credențiale
            }
        };
    }
}

