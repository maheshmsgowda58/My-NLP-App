package com.example.nlp.service;

import com.example.nlp.model.User;
import com.example.nlp.model.UserHistory;
import com.example.nlp.repository.HistoryRepository;
import com.example.nlp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    private UserRepository userRepository;

    public UserHistory saveHistory(UserHistory history) {
        return historyRepository.save(history);
    }

    public List<UserHistory> getAllHistory() {
        return historyRepository.findAllByOrderByTimestampDesc();
    }

    public List<UserHistory> getHistoryByUserId(String userId) {
        return historyRepository.findByUserIdOrderByTimestampDesc(userId);
    }

    public Optional<UserHistory> getHistoryById(String historyId) {
        return historyRepository.findById(historyId);
    }

    public void deleteHistoryById(String historyId) {
        historyRepository.deleteById(historyId);
    }

    public UserHistory updateHistorySavedStatus(String historyId, boolean saved) {
        Optional<UserHistory> historyOpt = historyRepository.findById(historyId);
        if (historyOpt.isPresent()) {
            UserHistory history = historyOpt.get();
            history.setSaved(saved);
            return historyRepository.save(history);
        }
        return null;
    }

    public Optional<User> getUserByUsernameOrEmail(String identifier) {
        return userRepository.findByUsernameOrEmail(identifier, identifier);
    }

    public Optional<User> getUserById(String userId) {
        return userRepository.findById(userId);
    }
}
