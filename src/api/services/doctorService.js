import axiosClient from '../core/axiosClient';

export const doctorService = {
  getDoctors: async (params) => {
    return axiosClient.get('/doctors/profile/public', { params });
  },

  getDoctorById: async (id) => {
    return axiosClient.get(`/doctors/profile/public/${id}`);
  },

  /** @param {string} doctorId @param {{ serviceDate: string, locationId?: string }} params */
  getAvailableSlots: async (doctorId, params) => {
    return axiosClient.get(`/doctors/profile/${doctorId}/slots`, {
      params,
    });
  },
};
