
# 🧠 My-NLP-App

**My-NLP-App** is a full-stack web application that provides advanced Natural Language Processing (NLP) features through a unified and user-friendly interface. It enables real-time **text translation**, **text summarization**, **speech-to-text**, **text-to-speech**, and **history tracking** with PDF download options.

---

## ✨ Features

- 🌍 Multilingual **Text Translation**
- 📝 **Text Summarization** (Extractive and Abstractive)
- 🎙️ **Speech-to-Text** input
- 🔊 **Text-to-Speech** output
- 🧾 **History Tracking** with filtering and delete options
- 📥 **Download Results as PDF**
- 📂 Organized history storing both input/output and meta-info
- 🔐 **User Authentication** with personalized sessions

---

## ⚙️ Tech Stack

| Layer       | Technology                 |
|-------------|-----------------------------|
| Frontend    | React.js, Tailwind CSS      |
| Backend     | Spring Boot (Java)          |
| NLP Service | Python, Flask, Transformers |
| Database    | MongoDB                     |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/maheshmsgowda58/My-NLP-App.git
cd My-NLP-App
```

### 2. Python NLP Service Setup

```bash
cd python-service
python -m venv .venv
.venv\Scripts\activate  # For Windows
pip install -r requirements.txt
python app.py
```

### 3. Spring Boot Backend Setup

```bash
cd backend
./mvnw spring-boot:run
```

### 4. React Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📦 Folder Structure

```
My-NLP-App/
├── frontend/
├── backend/
├── python-service/
│   ├── BertSum/
│   └── bert-extractive-summarizer/
├── requirements.txt
└── README.md
```

---

## 📸 Screenshots

> _To be added after UI completion_

---

## 🛠️ Project Highlights

- Combines multilingual translation and summarization
- Integrates modern NLP models like BERT, BART, etc.
- MongoDB database for scalable history tracking
- Support for speech input and output
- Organized project structure with modular components

---

## 📚 License

This project is licensed under the **MIT License**.  
Feel free to use, modify, and distribute it.

---

## 🙌 Acknowledgements

- [Hugging Face Transformers](https://huggingface.co/transformers/)
- [Google Translate API](https://pypi.org/project/googletrans/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [React.js](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/)

---

## 👤 Author

**Mahesh M S Gowda**  
Final Year MCA Student – Ramaiah Institute of Technology  
GitHub: [@maheshmsgowda58](https://github.com/maheshmsgowda58)
