// frontend/src/pages/Profile.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Profile.css";
import ReturnToHomeButton from "../components/ReturnToHomeButton";
import LogoutButton from "../components/LogoutButton";
import HistoryViewButton from "../components/HistoryViewButton";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Optional: add a logout handler to confirm logout or add logging
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="profile-container">
      <h2>👤 My Profile</h2>

      <div className="profile-info">
        <p>
          <strong>Username:</strong> {user?.username}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
      </div>

      <div className="profile-actions">
        <ReturnToHomeButton
          className="home-btn"
          onClick={() => navigate("/")}
        />

        <HistoryViewButton
          className="history-btn"
          onClick={() => navigate("/history")}
        />

        {/* ✅ Make sure to pass the correct prop name */}
        <LogoutButton className="logout-btn" onLogout={handleLogout} />
      </div>
    </div>
  );
};

export default Profile;
