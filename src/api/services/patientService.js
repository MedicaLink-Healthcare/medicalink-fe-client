import axiosClient from '../core/axiosClient';

export const patientService = {
  searchPatient: async (params) => {
    return axiosClient.get('/patients/public/search', { params });
  },

  createPatient: async (data) => {
    return axiosClient.post('/patients/public', data);
  },
};
