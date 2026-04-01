import axiosClient from '../core/axiosClient';

const AI_TIMEOUT_MS = 120000;

export const aiService = {
  /** @param {{ symptoms: string, topK?: number, specialtyIds?: string[] }} payload */
  recommendDoctor: async (payload) => {
    return axiosClient.post('/ai/recommend-doctor', payload, {
      timeout: AI_TIMEOUT_MS,
    });
  },

  /** @param {{ symptoms: string, specialties: { id: string, name: string }[] }} payload */
  suggestSpecialties: async (payload) => {
    return axiosClient.post('/ai/suggest-specialties', payload, {
      timeout: 90000,
    });
  },

  chat: async (message) => {
    return axiosClient.post('/ai/chat', { message });
  },
};
