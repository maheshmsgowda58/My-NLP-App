// src/main/java/com/example/nlp/service/SummarizationService.java

package com.example.nlp.service;

import com.example.nlp.model.UserHistory;
import com.example.nlp.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.logging.Logger;

@Service
public class SummarizationService {

    private static final Logger LOGGER = Logger.getLogger(SummarizationService.class.getName());

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private HistoryRepository historyRepository;

    @Value("${python.summarization.url}")
    private String pythonSummarizationUrl;

    public UserHistory summarize(UserHistory request) {
        Map<String, String> payload = new LinkedHashMap<>();
        payload.put("text", request.getInputText());
        payload.put("summary_type", request.getSummaryType());
        payload.put("summary_length", request.getSummaryLength());

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, String>> httpEntity = new HttpEntity<>(payload, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(pythonSummarizationUrl, httpEntity, Map.class);
            LOGGER.info("Python service response: " + response.getBody());

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Object summaryObj = response.getBody().get("summary");
                if (summaryObj instanceof String) {
                    request.setOutputText((String) summaryObj);
                } else {
                    request.setOutputText("Error: Unexpected format from Python service.");
                    LOGGER.warning("Summary not a string: " + summaryObj);
                }
            } else {
                request.setOutputText("Error: Empty or invalid response from Python service.");
                LOGGER.warning("No summary in response or bad status");
            }

            request.setTaskType("summarization");
            request.setInputLanguage(null);
            request.setOutputLanguage(null);
            request.setTimestamp(new Date());

            if (request.isSaved() && request.getUserId() != null && request.getUsername() != null) {
                LOGGER.info("Saving summary to history for user: " + request.getUsername());
                return historyRepository.save(request);
            } else {
                LOGGER.warning("Not saving summary. saved=" + request.isSaved() +
                        ", userId=" + request.getUserId() +
                        ", username=" + request.getUsername());
                return request;
            }

        } catch (Exception e) {
            LOGGER.severe("Error during summarization: " + e.getMessage());
            request.setOutputText("Error: " + e.getMessage());
            return request;
        }
    }
}
