import axios from "axios";

// Usar la URL de producción si estamos en producción, de lo contrario usar localhost
const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? 'https://proyecto-back-d1m5.onrender.com/api'  // URL del backend en producción
        : 'http://localhost:3000/api',  // URL del backend en desarrollo
    withCredentials: true  // Para manejar cookies, si es necesario
});

export default instance;
