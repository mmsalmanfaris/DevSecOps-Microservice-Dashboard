package com.example.javaservice.controller;

import org.springframework.boot.SpringBootVersion;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@RestController
public class InfoController {

    @GetMapping("/health")
    public Map<String, Object> getHealth() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "healthy");
        response.put("service", "java-service");
        response.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        response.put("uptime", "running");
        return response;
    }

    @GetMapping("/info")
    public Map<String, Object> getInfo() {
        Map<String, Object> response = new HashMap<>();
        
        // Basic service information
        response.put("service", "java-service");
        response.put("language", "Java");
        response.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        
        // Business logic data
        Map<String, Object> businessLogic = new HashMap<>();
        businessLogic.put("processedItems", 42);
        businessLogic.put("status", "operational");
        businessLogic.put("lastProcessed", LocalDateTime.now().minusMinutes(1).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        response.put("businessLogic", businessLogic);
        
        // Java and Spring Boot version information
        response.put("javaVersion", System.getProperty("java.version"));
        response.put("springBootVersion", SpringBootVersion.getVersion());
        
        return response;
    }
}