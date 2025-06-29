// frontend/src/pages/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const Login = () => {
  const [form, setForm] = useState({ usernameOrEmail: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Send login request with username or email
      const response = await loginUser({
        usernameOrEmail: form.usernameOrEmail,
        password: form.password,
      });

      // Check if the response contains the correct user data
      if (response.data) {
        console.log('Login successful:', response.data); // Debugging line to check the response

        // Destructure the required fields from the response data
        const { userId, username, email } = response.data;

        // Store the full user data in localStorage
        localStorage.setItem('user', JSON.stringify({ userId, username, email }));

        // Update AuthContext
        login({ userId, username, email });

        // Redirect to home page
        navigate('/');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid credentials. Please try again.');
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="usernameOrEmail"
          placeholder="Username or Email"
          value={form.usernameOrEmail}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      {error && <p className="error-msg">{error}</p>}

      <div className="register-redirect">
        <p>Don't have an account?</p>
        <button className="register-btn" onClick={goToRegister}>
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Login;
