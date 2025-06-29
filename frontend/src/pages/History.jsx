// frontend/src/pages/History.jsx

import React, { useEffect, useState } from "react";
import { useHistoryContext } from "../context/HistoryContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import languageList from "../utils/languageList"; // Import languageList.js
import "../styles/History.css";
import SearchButton from "../components/SearchButton";
import RefreshButton from "../components/RefreshButton";
import ReturnToHomeButton from "../components/ReturnToHomeButton";


const History = () => {
  const { user } = useAuth();
  const { history, fetchHistory, deleteHistoryItem, loading } =
    useHistoryContext();
  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (user?.userId) {
      fetchHistory(user.userId);
    }
  }, [user]);

  const handleRefresh = () => {
    if (user?.userId) {
      fetchHistory(user.userId);
      toast.success("✅ History refreshed!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHistoryItem(id);
      toast.success("🗑️ Item deleted");
      fetchHistory(user.userId);
    } catch (error) {
      console.error("Failed to delete history item:", error);
      toast.error("❌ Failed to delete item");
    }
  };

  const handleReturnHome = () => {
    navigate("/");
  };

  const summarizationCount = history.filter(
    (item) => item.taskType === "summarization"
  ).length;
  const translationCount = history.filter(
    (item) => item.taskType === "translation"
  ).length;

  const filtered = history.filter((item) =>
    filter === "all" ? true : item.taskType === filter
  );

  const sorted = [...filtered].sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  const searched = sorted.filter(
    (item) =>
      item.inputText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.outputText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to get language label by code
  const getLanguageLabel = (code) => {
    const language = languageList.find((lang) => lang.code === code);
    return language ? language.label : code; // Return the language label or the code if not found
  };

  return (
    <div className="history-container">
      <h2>📚 Your Activity History</h2>
      <div className="top-section">
        <div className="top-controls">
          <div className="left-controls">
            <div className="filter-buttons">
              <button
                onClick={() => setFilter("all")}
                className={filter === "all" ? "active-filter" : ""}
              >
                All
              </button>
              <button
                onClick={() => setFilter("summarization")}
                className={filter === "summarization" ? "active-filter" : ""}
              >
                Summarization
              </button>
              <button
                onClick={() => setFilter("translation")}
                className={filter === "translation" ? "active-filter" : ""}
              >
                Translation
              </button>
            </div>
            <div className="sort-buttons">
              <button
                onClick={() => setSortOrder("desc")}
                className={sortOrder === "desc" ? "active-filter" : ""}
              >
                Newest First
              </button>
              <button
                onClick={() => setSortOrder("asc")}
                className={sortOrder === "asc" ? "active-filter" : ""}
              >
                Oldest First
              </button>
            </div>
          </div>
          <div className="history-actions">
            <RefreshButton onClick={handleRefresh} className="refresh-btn"/>

            <ReturnToHomeButton onClick={handleReturnHome} className="home-btn"/>
              
          </div>
          <div className="right-search">
            <SearchButton
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search input/output..."
            />
          </div>
        </div>
      </div>

      {loading ? (
        <p>Loading history...</p>
      ) : history.length === 0 ? (
        <p>No history available.</p>
      ) : (
        <>
          <p className="record-count">
            🧾 Total Records: {history.length} &nbsp;&nbsp;
            <span>📑Summarization: {summarizationCount}</span> &nbsp;&nbsp;
            <span>🌍Translation: {translationCount}</span>
          </p>

          <div className="history-list">
            {searched.map((item) => (
              <div key={item.id} className="history-item">
                <div className="meta">
                  <span className={`task-type ${item.taskType}`}>
                    {item.taskType}
                  </span>
                  <span className="timestamp">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="texts">
                  <div>
                    <strong>Input:</strong> {item.inputText}
                  </div>
                  <div>
                    <strong>Output:</strong> {item.outputText}
                  </div>
                </div>
                {item.taskType === "summarization" ? (
                  <div className="tags">
                    <span className="tag-type">Type: {item.summaryType}</span>
                    <span className="tag-length">
                      Length: {item.summaryLength}
                    </span>
                  </div>
                ) : (
                  <div className="tags">
                    <span className="tag-from">
                      From: {getLanguageLabel(item.inputLanguage)}
                    </span>
                    <span className="tag-to">
                      To: {getLanguageLabel(item.outputLanguage)}
                    </span>
                  </div>
                )}
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default History;
