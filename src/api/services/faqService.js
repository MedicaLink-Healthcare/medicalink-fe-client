import axiosClient from '../core/axiosClient';

export const faqService = {
  getPublicFaqs: (params = {}) => axiosClient.get('/faqs', { params }),
};
