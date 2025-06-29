import api from './api';

export const translateText = async (data) => {
  try {
    const response = await api.post('/translate', data); // No token header
    return response.data;
  } catch (error) {
    console.error('❌ Translation API error:', error.response || error);
    throw error;
  }
};
