// frontend/src/routes.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Translation from './pages/Translation';
import Summarization from './pages/Summarization';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import History from './pages/History';
import NotFound from './pages/NotFound';

import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/translation"
        element={
          <ProtectedRoute>
            <Translation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/summarization"
        element={
          <ProtectedRoute>
            <Summarization />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
