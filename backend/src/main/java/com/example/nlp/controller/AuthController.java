// backend/src/main/java/com/example/nlp/controller/AuthController.java

package com.example.nlp.controller;

import com.example.nlp.model.User;
import com.example.nlp.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        ResponseEntity<?> response = authService.registerUser(user);
        if (response.getStatusCode().is2xxSuccessful() && response.getBody() instanceof User) {
            User createdUser = (User) response.getBody();
            Map<String, String> res = new HashMap<>();
            res.put("userId", createdUser.getId());
            res.put("username", createdUser.getUsername());
            res.put("email", createdUser.getEmail());
            return ResponseEntity.ok(res);
        }
        return response;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        ResponseEntity<?> response = authService.authenticateUser(user);
        if (response.getStatusCode().is2xxSuccessful() && response.getBody() instanceof User) {
            User authenticatedUser = (User) response.getBody();
            Map<String, String> res = new HashMap<>();
            res.put("userId", authenticatedUser.getId());
            res.put("username", authenticatedUser.getUsername());
            res.put("email", authenticatedUser.getEmail());
            return ResponseEntity.ok(res);
        }
        return response;
    }
}
