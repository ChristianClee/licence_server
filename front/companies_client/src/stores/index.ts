import axios from 'axios'

const http = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
  baseURL: '/api',
  timeout: 5000,
  headers: { 
    'Content-Type': 'application/json',
  },
  
})

// http.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token')
//     if (token) config.headers.Authorization = `Bearer ${token}`
//     return config
//   },
//   (error) => Promise.reject(error)
// )

// http.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token')
//     }
//     return Promise.reject(error)
//   }
// )




export { http }