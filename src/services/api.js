import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Base URL for all requests
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;