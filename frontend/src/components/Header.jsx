// frontend/src/components/Header.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const buttonColorClass = user ? 'profile-btn' : 'login-btn';

  if (!user) {
    return null; // If no user is logged in, don't display the header.
  }

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate('/')}>🧠 My NLP App</div>

      {/* Displaying username and Profile button only if logged in */}
      <div className="user-info">
        <span>Hello {user.username}  🧑‍💻</span>
        <button className={`animated-button ${buttonColorClass}`} onClick={handleClick}>
          <span className="circle"></span>

          <svg className="arr-1" viewBox="0 0 46 16">
            <path d="M0 8h44M38 1l7 7-7 7" strokeWidth="2" stroke="currentColor" fill="none" />
          </svg>
          <svg className="arr-2" viewBox="0 0 46 16">
            <path d="M0 8h44M38 1l7 7-7 7" strokeWidth="2" stroke="currentColor" fill="none" />
          </svg>

          <span className="text">
            <i className="bi bi-person-circle"></i> {user ? 'Profile' : 'Login'}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
