import axios from 'axios'
import { useLoaderStore } from '../services/loader'
import router from '../router'  // ← importa el router

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
})

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
    const loader = useLoaderStore()
    loader.detener()
    
    if (error.response?.status === 401) {
      const isLoginRoute = router.currentRoute.value.path === '/auth/login'
      
      if (!isLoginRoute) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        router.push('/auth/login')
      }
    }
    
    return Promise.reject(error)
  }
)

export default api