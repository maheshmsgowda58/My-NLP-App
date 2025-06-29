// frontend/src/pages/Register.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import '../styles/Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const validateInputs = () => {
    const { username, email, password } = formData;
    const usernameRegex = /^[a-zA-Z0-9._]+$/;
    const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

    if (!usernameRegex.test(username)) {
      return "Username can only contain letters, numbers, dots (.) and underscores (_)";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    if (!passwordRegex.test(password)) {
      return "Password must be 8+ characters, include uppercase, lowercase, number & special character";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await registerUser(formData);
      const { userId } = response.data;
      localStorage.setItem('user', JSON.stringify({ userId }));
      setSuccess("Registered successfully! Redirecting to login...");
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      const msg = err.response?.data || "Registration failed. Try again.";
      setError(msg);
    }
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}
        <button type="submit">Register</button>
      </form>

      <div className="login-redirect">
        <p>Already have an account?</p>
        <button className="login-btn" onClick={handleGoToLogin}>
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Register;
