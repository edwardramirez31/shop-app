import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://edwardramirez.pythonanywhere.com',
});

export default axiosInstance;
