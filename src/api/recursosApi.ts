import axios from 'axios';

const recursosApi = axios.create({
  baseURL: import.meta.env.VITE_RRHH_API_URL,
});

// // Interceptor para agregar el token a las peticiones
// recursosApi.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export { recursosApi };
