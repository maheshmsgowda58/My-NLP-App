// backend/src/main/java/com/example/nlp/controller/SummarizationController.java

package com.example.nlp.controller;

import com.example.nlp.model.UserHistory;
import com.example.nlp.service.SummarizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/summarize")
public class SummarizationController {

    @Autowired
    private SummarizationService summarizationService;

    @PostMapping
    public ResponseEntity<?> summarize(@RequestBody UserHistory request) {
        try {
            if (request.getInputText() == null || request.getInputText().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Input text cannot be empty");
            }

            UserHistory result = summarizationService.summarize(request);

            if (result.getOutputText() == null || result.getOutputText().isEmpty()) {
                return ResponseEntity.internalServerError().body("Summary generation failed");
            }

            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
