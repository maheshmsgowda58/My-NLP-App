// backend/src/main/java/com/example/nlp/service/AuthService.java

package com.example.nlp.service;

import com.example.nlp.model.User;
import com.example.nlp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    // Register user with validation
    public ResponseEntity<?> registerUser(User user) {
        String username = user.getUsername();
        String email = user.getEmail();
        String password = user.getPassword();

        // Validate username (only letters, numbers, underscores, and dots)
        if (!Pattern.matches("^[a-zA-Z0-9._]+$", username)) {
            return ResponseEntity.badRequest().body("Username can only contain letters, numbers, dots, and underscores.");
        }

        // Check for duplicate username
        if (userRepository.findByUsername(username).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists.");
        }

        // Validate email format
        if (!Pattern.matches("^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$", email)) {
            return ResponseEntity.badRequest().body("Invalid email format.");
        }

        // Check for duplicate email
        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists.");
        }

        // Validate password
        if (!isValidPassword(password)) {
            return ResponseEntity.badRequest().body("Password must be at least 8 characters long and contain an uppercase letter, lowercase letter, number, and special character.");
        }

        // Save and return user
        return ResponseEntity.ok(userRepository.save(user));
    }

    // Login with either username or email + password
    public ResponseEntity<?> authenticateUser(User loginRequest) {
        String identifier = loginRequest.getUsername(); // used for username or email
        String password = loginRequest.getPassword();

        System.out.println("Login attempt with identifier: " + identifier);

        Optional<User> foundUser = userRepository.findByUsernameOrEmail(identifier, identifier);

        if (foundUser.isPresent()) {
            User user = foundUser.get();
            System.out.println("User found: " + user.getUsername());

            if (user.getPassword().equals(password)) {
                System.out.println("Password matched.");
                return ResponseEntity.ok(user);
            } else {
                System.out.println("Password mismatch.");
                return ResponseEntity.status(401).body("Invalid credentials.");
            }
        } else {
            System.out.println("User not found for identifier: " + identifier);
            return ResponseEntity.status(401).body("Invalid credentials.");
        }
    }

    // Helper for password validation
    private boolean isValidPassword(String password) {
        return password.length() >= 8 &&
                password.matches(".*[a-z].*") &&        // lowercase
                password.matches(".*[A-Z].*") &&        // uppercase
                password.matches(".*\\d.*") &&          // digit
                password.matches(".*[!@#$%^&*()_+=\\[\\]{};':\"\\\\|,.<>/?-].*"); // special char
    }
}
