import axios from 'axios';
import { storage } from '../../App';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use(config => {
  const token = storage.getString('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
