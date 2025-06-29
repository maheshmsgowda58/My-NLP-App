// frontend/src/components/ProtectedRoute.jsx

import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);

  // Mark auth as "checked" after hydration attempt
  useEffect(() => {
    setAuthChecked(true);
  }, [user]);

  if (!authChecked) {
    // Wait for AuthContext to load from localStorage
    return null; // or loading spinner
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
