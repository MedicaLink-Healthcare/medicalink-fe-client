import axiosClient from '../core/axiosClient';

export const specialtyService = {
  getSpecialties: async (params) => {
    return axiosClient.get('/specialties/public', { params });
  },
};
