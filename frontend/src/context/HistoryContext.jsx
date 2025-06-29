// frontend/src/context/HistoryContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserHistory, deleteHistoryItem } from '../services/historyService';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async (userId) => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await getUserHistory(userId);
      setHistory(res || []);
    } catch (err) {
      console.error('❌ Failed to fetch history:', err);
      toast.error('❌ Failed to fetch history!');
    } finally {
      setLoading(false);
    }
  };

  const deleteHistoryItemById = async (historyId) => {
    try {
      await deleteHistoryItem(historyId);
    } catch (err) {
      console.error('❌ Failed to delete history:', err);
      throw err;
    }
  };

  useEffect(() => {
    if (user?.userId) {
      fetchHistory(user.userId);
    }
  }, [user]);

  return (
    <HistoryContext.Provider value={{ history, setHistory, fetchHistory, deleteHistoryItem: deleteHistoryItemById, loading }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistoryContext = () => useContext(HistoryContext);
