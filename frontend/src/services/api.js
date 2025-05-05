import axios from 'axios';

const baseURL = '/api';
console.log('API URL:', baseURL);

const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('auth_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Erro ao processar requisição');
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = sessionStorage.getItem('auth_refresh_token');
        
        if (refreshToken) {
          const refreshResponse = await axios.post(`${baseURL}/auth/refresh`, {
            refreshToken
          });
          
          const newToken = refreshResponse.data.token;
          
          sessionStorage.setItem('auth_token', newToken);
          
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          
          return axios(originalRequest);
        }
      } catch (refreshError) {
        console.error('Erro ao renovar token', refreshError);
      }
      
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('auth_refresh_token');
      sessionStorage.removeItem('auth_user');
      
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;