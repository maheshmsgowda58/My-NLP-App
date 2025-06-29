// frontend/src/components/LogoutButton.jsx
import React from 'react';
import '../styles/LogoutButton.css';

const LogoutButton = ({ onLogout, className = '' }) => {
  return (
    <button className={`logout-btn ${className}`} onClick={onLogout}>
      <p>Logout</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="logout-icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </button>
  );
};

export default LogoutButton;
