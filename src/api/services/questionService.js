import axiosClient from '../core/axiosClient';

const ORCH_TIMEOUT_MS = 20000;

export const questionService = {
  createQuestion: async (data) => {
    return axiosClient.post('/questions', data, { timeout: 15000 });
  },

  getQuestions: async (params) => {
    return axiosClient.get('/questions', { params, timeout: ORCH_TIMEOUT_MS });
  },

  getQuestionDetail: async (id, options = {}) => {
    const { increaseView } = options;
    const params =
      increaseView === false ? { increaseView: 'false' } : undefined;
    return axiosClient.get(`/questions/${id}`, {
      params,
      timeout: ORCH_TIMEOUT_MS,
    });
  },

  getAcceptedAnswers: async (id, params = {}) => {
    return axiosClient.get(`/questions/${id}/answers/accepted`, {
      params,
      timeout: 15000,
    });
  },
};
