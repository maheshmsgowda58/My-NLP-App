// backend/src/main/java/com/example/nlp/controller/TranslationController.java

package com.example.nlp.controller;

import com.example.nlp.model.UserHistory;
import com.example.nlp.service.TranslationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/translate")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true") // Allows frontend access
public class TranslationController {

    @Autowired
    private TranslationService translationService;

    @PostMapping
    public ResponseEntity<?> translateText(@Valid @RequestBody UserHistory request) {
        System.out.println("✅ Received Translation Request: " + request);

        if (request.getUserId() == null || request.getUsername() == null) {
            System.out.println("❌ Missing userId or username");

            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Bad Request");
            errorResponse.put("message", "userId and username are required.");
            errorResponse.put("status", 400);
            errorResponse.put("timestamp", System.currentTimeMillis());

            return ResponseEntity.badRequest().body(errorResponse);
        }

        UserHistory result = translationService.translate(request);
        return ResponseEntity.ok(result);
    }
}
