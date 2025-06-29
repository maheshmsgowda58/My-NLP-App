// frontend/src/services/authService.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

// Register a new user
export const registerUser = (data) => {
  return axios.post(`${API_URL}/signup`, data);
};

// Login using either email or username
export const loginUser = async ({ usernameOrEmail, password }) => {
  const response = await axios.post(`${API_URL}/login`, {
    username: usernameOrEmail, // Must match backend's field
    password,
  });

  const { userId, username, email } = response.data;

  // Optional: Store user info in localStorage if not using context directly
  localStorage.setItem('userId', userId);
  localStorage.setItem('username', username);
  localStorage.setItem('email', email);

  return response;
};
