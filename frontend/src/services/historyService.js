// frontend/src/services/historyService.js

import api from './api';

export const getUserHistory = async (userId) => {
  try {
    const response = await api.get(`/history/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
};

export const deleteHistoryItem = async (historyId) => {
  try {
    const response = await api.delete(`/history/${historyId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting history:', error);
    throw error;
  }
};
