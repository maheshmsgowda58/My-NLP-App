// frontend/src/services/summarizationService.js

import api from './api';

export const summarizeText = async (payload) => {
  try {
    const response = await api.post('/summarize', payload);

    // Debugging log
    console.log('🧠 API Response:', response?.data);

    const summary = response?.data?.outputText;

    if (typeof summary === 'string' && summary.trim()) {
      return { summary };
    } else {
      console.warn('⚠️ No valid summary (outputText) in response:', response?.data);
      return { summary: null };
    }
  } catch (error) {
    console.error('❌ Summarization API error:', error?.response || error);
    return { summary: null };
  }
};
