import axiosClient from '../core/axiosClient';

export const utilityService = {
  sendContactMessage: async (data) => {
    return axiosClient.post('/utilities/contact', data);
  },
};
