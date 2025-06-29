// frontend/src/components/MicVisualizer.jsx

import React from 'react';
import '../styles/MicVisualizer.css';

const MicVisualizer = ({ isListening }) => {
  return (
    <div className={`mic-circle ${isListening ? 'listening' : ''}`}>
      🎤
    </div>
  );
};

export default MicVisualizer;
