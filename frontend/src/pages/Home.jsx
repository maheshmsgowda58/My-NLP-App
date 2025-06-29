// frontend/src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';
import TranslationButton from "../components/TranslationButton";
import SummarizationButton from "../components/SummarizationButton";
// Import images
import translationImage from '../assets/images/translation.png';
import summarizationImage from '../assets/images/summarization.png';


const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAccess = (targetRoute) => {
    if (!user) {
      navigate('/login', { state: { from: targetRoute } });
    } else {
      navigate(targetRoute);
    }
  };

  return (
    <div className="home-container">
    <div className="home-banner">
      <h1>Welcome to My NLP App</h1>
      <p>This app helps you:</p>
      <ul>
        <li>🔄 Translate text between languages</li>
        <li>📝 Summarize long texts in seconds</li>
        <li>📚 Automatically save your activities in history</li>
      </ul>
      </div>

      <div className="home-buttons">
        <div className="home-button-container">
          <img
            src={translationImage}
            alt="Translation"
            className="home-button-image"
            onClick={() => handleAccess('/translation')}
          />
          <TranslationButton onClick={() => handleAccess('/translation')}/>
        </div>
        <div className="home-button-container">
          <img
            src={summarizationImage}
            alt="Summarization"
            className="home-button-image"
            onClick={() => handleAccess('/summarization')}
          />
          <SummarizationButton onClick={() => handleAccess('/summarization')}/>
        </div>
      </div>

      {/* Benefit Section */}
      <div className="benefit-section">
        <h2>🌍 Translation Benefits</h2>
        <ul>
          <li><strong> Break Language Barriers: </strong>Instantly translate text between multiple languages to communicate globally.</li>
          <li> <strong>Boost Accessibility: </strong>Help users understand content in their preferred language, enhancing inclusivity.</li>
          <li><strong> Enhance Learning:</strong> Easily explore and understand foreign language content to support education and research.</li>
          <li><strong> Improve Global Reach: </strong>Businesses and content creators can connect with a broader audience by offering multilingual support.</li>
        </ul>

        <h2>📝 Summarization Benefits</h2>
        <ul>
          <li><strong> Save Time:</strong> Get quick overviews of long articles or documents in seconds.</li>
          <li><strong> Focus on Key Points: </strong>Extract the most important ideas without reading the full text.</li>
          <li> <strong>Reduce Information Overload: </strong>Simplify complex or lengthy content to make decision-making faster and easier.</li>
          <li><strong> Aid in Studying:</strong> Create concise summaries of textbooks, research papers, or notes for efficient revision.</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
