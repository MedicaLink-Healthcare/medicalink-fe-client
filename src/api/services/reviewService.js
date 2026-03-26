import axiosClient from '../core/axiosClient';

export const reviewService = {
  getDoctorReviews: async (doctorId) => {
    return axiosClient.get(`/reviews/doctor/${doctorId}`);
  },

  getClinicReviews: async (clinicId) => {
    return axiosClient.get(`/reviews/clinic/${clinicId}`);
  },

  createReview: async (data) => {
    return axiosClient.post('/reviews', data);
  },
};
