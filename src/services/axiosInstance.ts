import axios from 'axios';
import { store } from '@/store';
import { logout, setCredentials } from '@/features/auth/authSlice';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        const refreshToken = store.getState().auth.refreshToken;
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post('http://localhost:5000/api/v1/auth/refresh-tokens', { refreshToken });
        const { tokens, user } = response.data;

        store.dispatch(setCredentials({ tokens, user }));

        originalRequest.headers.Authorization = `Bearer ${tokens.access.token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
