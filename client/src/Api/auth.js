import axios from "./axios.js";

const API = process.env.NODE_ENV === 'production' 
    ? 'https://proyecto-back-d1m5.onrender.com'  // URL de producción
    : 'http://localhost:3000/api';  // Usará localhost en desarrollo

export const registerRequest = user => axios.post(`/register`, user)

export const loginRequest = user => axios.post(`/login`, user)

export const verifyTokenRequest = () => axios.get('/verify')

