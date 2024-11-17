package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // modifică această linie în funcție de endpoint-urile tale
                .allowedOrigins("http://localhost:5173") // frontend-ul tău
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // metodele HTTP permise
                .allowedHeaders("*"); // permite toate header-ele

    }
}