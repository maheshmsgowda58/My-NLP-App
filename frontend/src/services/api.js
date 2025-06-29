// frontend/src/services/api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Update if backend URL changes

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
