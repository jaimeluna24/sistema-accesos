import axios from 'axios'
import { useLoaderStore } from '../services/loader'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
})

// Interceptor para agregar token JWT (opcional)
api.interceptors.request.use((config) => {
  const loader = useLoaderStore()
  loader.iniciar()
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => {
    const loader = useLoaderStore()
    loader.detener()
    return res
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

export default api 