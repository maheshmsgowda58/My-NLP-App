import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on initial mount
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      console.log('User loaded from localStorage:', stored); // Debug log
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = (userData) => {
    // Check for required fields (userId instead of _id)
    if (!userData || !userData.userId || !userData.username || !userData.email) {
      console.error('Invalid userData:', userData);
      return;
    }

    const cleanedUser = {
      userId: userData.userId,
      username: userData.username,
      email: userData.email,
    };

    console.log('User logging in:', cleanedUser);
    setUser(cleanedUser);
    localStorage.setItem('user', JSON.stringify(cleanedUser));
  };

  const logout = () => {
    console.log('User logging out');
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
