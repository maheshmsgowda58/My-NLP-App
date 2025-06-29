// frontend/src/pages/NotFound.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <button className="home-btn" onClick={() => navigate('/')}>
        Return to Home
      </button>
    </div>
  );
};

export default NotFound;
