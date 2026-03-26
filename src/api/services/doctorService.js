import axiosClient from '../core/axiosClient';

export const doctorService = {
  getDoctors: async (params) => {
    return axiosClient.get('/doctors/profile/public', { params });
  },

  getDoctorById: async (id) => {
    return axiosClient.get(`/doctors/profile/public/${id}`);
  },
};
