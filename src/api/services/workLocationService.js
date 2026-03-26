import axiosClient from '../core/axiosClient';

export const workLocationService = {
  getWorkLocations: async (params) => {
    return axiosClient.get('/work-locations/public', { params });
  },
};
