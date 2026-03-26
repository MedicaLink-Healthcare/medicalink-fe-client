import axiosClient from '../core/axiosClient';

export const appointmentService = {
  holdSlot: async (data) => {
    return axiosClient.post('/appointments/hold', data);
  },

  confirmBooking: async (data) => {
    return axiosClient.post('/appointments/public', data);
  },
};
