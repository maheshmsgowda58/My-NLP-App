// frontend/src/components/SearchButton.jsx
import React from 'react';
import '../styles/SearchButton.css';

const SearchButton = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <div className="input-container">
      <input
        type="text"
        name="text"
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <span className="icon">
        <svg
          width="19px"
          height="19px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="1"
            d="M14 5H20"
            stroke="#000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="1"
            d="M14 8H17"
            stroke="#000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
            stroke="#000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="1"
            d="M22 22L20 20"
            stroke="#000"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
};

export default SearchButton;
