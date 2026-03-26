import axiosClient from '../core/axiosClient';

export const questionService = {
  createQuestion: async (data) => {
    return axiosClient.post('/questions', data);
  },

  getQuestions: async (params) => {
    return axiosClient.get('/questions', { params });
  },

  getQuestionDetail: async (id) => {
    return axiosClient.get(`/questions/${id}`);
  },

  getAcceptedAnswers: async (id) => {
    return axiosClient.get(`/questions/${id}/answers/accepted`);
  },
};
