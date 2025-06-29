# 🧠 My-NLP-App

**My-NLP-App** is a full-stack Natural Language Processing (NLP) web application that helps users:

- Translate text between multiple languages
- Summarize long content into short notes (abstractive & extractive)
- Convert speech to text and text to speech
- Perform sentiment analysis
- Automatically save and manage history of all actions

It is designed to be simple, fast, and accurate — combining modern front-end and back-end technologies with advanced NLP models.

---

## 🚀 Features

- 🌐 **Multilingual Translation** using HuggingFace models
- 📝 **Text Summarization** (Abstractive and Extractive)
- 🎙️ **Speech-to-Text** and 🔊 **Text-to-Speech**
- 😊 **Sentiment Analysis**
- 💾 **History Management** with Search, Filter, and Delete
- 📥 **Download Output as PDF**
- 🔐 **User Authentication (Sign Up / Login)**

---

## 🛠️ Tech Stack

| Layer        | Technology Used                    |
| ------------ | ---------------------------------- |
| Frontend     | React, Tailwind CSS                |
| Backend      | Spring Boot (Java)                 |
| NLP Services | Python (Flask, Transformers)       |
| Database     | MongoDB                            |
| Others       | NLTK, Sumy, ReportLab, Googletrans |

---

## 📁 Project Structure

My-NLP-App/
├── frontend/ # React frontend code
├── backend/ # Spring Boot Java backend
├── nlp-services/ # Python Flask NLP microservices
│ └── app.py # Handles summarization & translation
├── README.md # Project documentation
└── .gitignore

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/My-NLP-App.git
cd My-NLP-App

2. Backend (Java - Spring Boot)
Open /backend in IntelliJ or Eclipse

Run the Spring Boot application (MainApplication.java)

3. Frontend (React)
cd frontend
npm install
npm start

4. NLP Microservice (Python + Flask)

cd nlp-services
pip install -r requirements.txt
python app.py
```
