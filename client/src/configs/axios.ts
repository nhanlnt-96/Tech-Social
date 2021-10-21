import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('accessToken');
const api = axios.create({
  // baseURL: 'https://social-app-lnt.herokuapp.com',
  baseURL: 'http://localhost:3001',
  headers: { accessToken: `${token}` },
});

export default api;
