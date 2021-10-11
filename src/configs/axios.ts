import axios from 'axios';

const api = axios.create({
  baseURL: 'https://social-app-lnt.herokuapp.com',
  headers: { accessToken: `${localStorage.getItem('accessToken')}` },
});

export default api;
