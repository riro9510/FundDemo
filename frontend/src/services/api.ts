import axios from 'axios';

const baseURL =
  import.meta.env.ENVIRONMENT === 'production'
    ? import.meta.env.VITE_API_URL_PROD
    : (import.meta.env.VITE_API_URL_DEV ?? 'http://localhost:3000/api');
const token = import.meta.env.VITE_API_TOKEN;
const useCookies = import.meta.env.VITE_USE_COOKIES === 'true';

const getToken = (): string | null => {
  return localStorage.getItem('auth_token') || null; 
};

export const setToken = (token: string): void => {
  localStorage.setItem('auth_token', token); 
}

const getAuthHeaders = (token?: string): Record<string, string> => {
  return token ? { Authorization: 'Bearer ' + token } : {};
};

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    ...(!useCookies ? getAuthHeaders(token) : {}),
  },
  withCredentials: useCookies,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  },
);
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
