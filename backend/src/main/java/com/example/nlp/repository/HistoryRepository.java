// backend/src/main/java/com/example/nlp/repository/HistoryRepository.java
package com.example.nlp.repository;

import com.example.nlp.model.UserHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface HistoryRepository extends MongoRepository<UserHistory, String> {
    List<UserHistory> findByUserIdOrderByTimestampDesc(String userId);
    List<UserHistory> findByUserIdAndSavedTrueOrderByTimestampDesc(String userId);
    List<UserHistory> findAllByOrderByTimestampDesc();
}
