import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

// Базовый интерфейс для ответов API
export interface ApiResponse<T = any> {
  data: T;
  status: number;
}

// Конфигурация Axios
const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://dev/api/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехват запросов: добавление токена
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Перехват ответов: обработка 401 (авто-рефреш токена)
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) throw new Error('Нет refresh-токена');
        const { data } = await http.post('auth/refresh', { refreshToken });
        const { token } = data;
        localStorage.setItem('access_token', token);
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return http(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.dispatchEvent(new Event('authStateChanged'));
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const request = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    http.get<T>(url, config),
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    http.post<T>(url, data, config),
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    http.put<T>(url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    http.delete<T>(url, config),
};

export default http;
