import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true, // 👈 this is required
});

export default API;
