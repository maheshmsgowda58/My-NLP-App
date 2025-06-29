// frontend/src/components/HistoryViewButton.jsx

import React from 'react';
import '../styles/HistoryViewButton.css';

const HistoryViewButton = ({ onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      
      <span className="title">📜  View History </span>
      <div className="padding-left hide">
        <div className="padding-left-line">
          <span className="padding-left-text"> 🌍Translation</span>
        </div>
      </div>
      <div className="padding-right hide">
        <div className="padding-right-line">
          <span className="padding-right-text">📑Summarization</span>
        </div>
      </div>
      <div className="background hide">
        <span className="background-text">📚 Your Activity History</span>
      </div>
      <div className="border hide">
        <span className="border-text"> 🧾 Total Records</span>
      </div>
    </button>
  );
};

export default HistoryViewButton;
