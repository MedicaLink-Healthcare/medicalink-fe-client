import axiosClient from '../core/axiosClient';

export const appointmentService = {
  holdSlot: async (data) => {
    return axiosClient.post('/appointments/hold', data);
  },

  releaseHold: async (data) => {
    return axiosClient.delete('/appointments/hold', { data });
  },

  confirmBooking: async (data) => {
    return axiosClient.post('/appointments/public', data);
  },

  getPatientAppointments: async (patientId, params) => {
    return axiosClient.get(`/appointments/public/patient/${patientId}`, { params });
  },
};
