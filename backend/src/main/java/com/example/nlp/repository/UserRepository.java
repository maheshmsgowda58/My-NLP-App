// backend/src/main/java/com/example/nlp/repository/UserRepository.java

package com.example.nlp.repository;

import com.example.nlp.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    // Find by username
    Optional<User> findByUsername(String username);

    // Find by email
    Optional<User> findByEmail(String email);

    // Find by either username or email for login
    Optional<User> findByUsernameOrEmail(String username, String email);
}
