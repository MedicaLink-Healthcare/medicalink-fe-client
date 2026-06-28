import axios from 'axios';
import { API_CONFIG } from './config';

const ENV = import.meta.env.VITE_APP_ENVIRONMENT || 'development';

const BASE_DOMAIN =
  ENV === 'production'
    ? import.meta.env.VITE_API_BASE_URL_PRO
    : import.meta.env.VITE_API_BASE_URL_DEV || 'http://localhost:3000';

const axiosClient = axios.create({
  baseURL: `${BASE_DOMAIN}${API_CONFIG.PREFIX}`,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },

  validateStatus: (status) => status >= 200 && status < 300,
});

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      return Promise.reject({
        message: data?.message || 'Kết nối với server không thành công',
        status,
        data,
      });
    }

    if (error.request) {
      return Promise.reject({
        message: 'Không nhận được phản hồi từ server',
      });
    }

    return Promise.reject({
      message: error.message,
    });
  }
);

export default axiosClient;
