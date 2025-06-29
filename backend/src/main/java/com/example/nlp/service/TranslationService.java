// backend/src/main/java/com/example/nlp/service/TranslationService.java

package com.example.nlp.service;

import com.example.nlp.model.UserHistory;
import com.example.nlp.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@Service
public class TranslationService {

    private static final Logger LOGGER = Logger.getLogger(TranslationService.class.getName());

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private HistoryRepository historyRepository;

    @Value("${python.translation.url}")
    private String pythonTranslationUrl;

    public UserHistory translate(UserHistory request) {
        LOGGER.info("⬅️ Starting translation for input: " + request.getInputText());

        // Validate required fields before proceeding
        if (request.getInputText() == null || request.getInputLanguage() == null || request.getOutputLanguage() == null) {
            request.setOutputText("Error: Missing input text or language fields.");
            return request;
        }

        Map<String, String> payload = new HashMap<>();
        payload.put("text", request.getInputText());
        payload.put("source_lang", request.getInputLanguage());
        payload.put("target_lang", request.getOutputLanguage());

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, String>> httpEntity = new HttpEntity<>(payload, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(pythonTranslationUrl, httpEntity, Map.class);
            LOGGER.info("🐍 Python translation service responded: " + response.getBody());

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null && response.getBody().containsKey("translatedText")) {
                request.setOutputText((String) response.getBody().get("translatedText"));
            } else {
                request.setOutputText("Error: Invalid response from Python service.");
            }

            // Set metadata
            request.setTaskType("translation");
            request.setSummaryType(null);
            request.setSummaryLength(null);
            request.setTimestamp(new Date());

            // Logging user details
            LOGGER.info("📝 Final UserHistory object: " + request);

            // Save only if requested
            if (request.isSaved() && request.getUserId() != null && request.getUsername() != null) {
                LOGGER.info("💾 Saving translation history for userId: " + request.getUserId() + ", username: " + request.getUsername());
                return historyRepository.save(request);
            } else {
                LOGGER.warning("⚠️ Not saving: Either 'saved' is false or userId/username is missing");
                return request;
            }

        } catch (Exception e) {
            LOGGER.severe("❌ Error during translation: " + e.getMessage());
            e.printStackTrace();
            request.setOutputText("Error: " + e.getMessage());
            return request;
        }
    }
}
