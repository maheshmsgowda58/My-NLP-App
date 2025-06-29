// backend/src/main/java/com/example/nlp/model/UserHistory.java
package com.example.nlp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotNull;
import java.util.Date;

@Document(collection = "user_history")
public class UserHistory {

    @Id
    private String id;

    @NotNull(message = "UserId cannot be null")
    private String userId;

    @NotNull(message = "Username cannot be null")
    private String username;

    private String inputText;
    private String outputText;

    private String taskType; // 'summarization' or 'translation'

    // Only for translation
    private String inputLanguage;
    private String outputLanguage;

    // Only for summarization
    private String summaryType;    // abstractive or extractive
    private String summaryLength;  // Short / Medium / Long

    private boolean saved;
    private Date timestamp = new Date();

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getInputText() {
        return inputText;
    }

    public void setInputText(String inputText) {
        this.inputText = inputText;
    }

    public String getOutputText() {
        return outputText;
    }

    public void setOutputText(String outputText) {
        this.outputText = outputText;
    }

    public String getTaskType() {
        return taskType;
    }

    public void setTaskType(String taskType) {
        this.taskType = taskType;
    }

    public String getInputLanguage() {
        return inputLanguage;
    }

    public void setInputLanguage(String inputLanguage) {
        this.inputLanguage = inputLanguage;
    }

    public String getOutputLanguage() {
        return outputLanguage;
    }

    public void setOutputLanguage(String outputLanguage) {
        this.outputLanguage = outputLanguage;
    }

    public String getSummaryType() {
        return summaryType;
    }

    public void setSummaryType(String summaryType) {
        this.summaryType = summaryType;
    }

    public String getSummaryLength() {
        return summaryLength;
    }

    public void setSummaryLength(String summaryLength) {
        this.summaryLength = summaryLength;
    }

    public boolean isSaved() {
        return saved;
    }

    public void setSaved(boolean saved) {
        this.saved = saved;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
}
