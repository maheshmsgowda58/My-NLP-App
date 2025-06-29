package com.example.nlp.controller;

import com.example.nlp.model.UserHistory;
import com.example.nlp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
public class HistoryController {

    @Autowired
    private UserService userService;

    @PostMapping("/save")
    public UserHistory saveHistory(@RequestBody UserHistory history) {
        return userService.saveHistory(history);
    }

    @GetMapping("/user/{userId}")
    public List<UserHistory> getHistoryByUserId(@PathVariable String userId) {
        return userService.getHistoryByUserId(userId);
    }

    @GetMapping("/all")
    public List<UserHistory> getAllHistory() {
        return userService.getAllHistory();
    }

    @GetMapping("/{historyId}")
    public UserHistory getHistoryById(@PathVariable String historyId) {
        return userService.getHistoryById(historyId).orElse(null);
    }

    @DeleteMapping("/{historyId}")
    public ResponseEntity<String> deleteHistoryById(@PathVariable String historyId) {
        userService.deleteHistoryById(historyId);
        return ResponseEntity.ok("History deleted successfully.");
    }

    @PutMapping("/update/{historyId}")
    public UserHistory updateHistorySavedStatus(@PathVariable String historyId, @RequestParam boolean saved) {
        return userService.updateHistorySavedStatus(historyId, saved);
    }
}
