import axios from 'configs/axios';

const api = axios.create({
  // baseURL: 'https://social-app-lnt.herokuapp.com',
  baseURL: 'http://localhost:3001',
  headers: { accessToken: `${localStorage.getItem('accessToken')}` },
});

export default api;
