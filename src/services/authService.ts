import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router from '../router'
import { login as loginApi } from '../api/auth'
import type { LoginCredentials, AuthUser } from '../types/auth'

const RUTA_POR_ROL: Record<string, string> = {
  administrador: '/dashboard',
  lector:        '/dashboard',
  gestor:        '/dashboard',
  normal:        '/dashboard',
  guardia:       '/escanear-pase',
}


export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user  = ref<AuthUser | null>(JSON.parse(localStorage.getItem('user') || 'null'))

  const isAuthenticated = computed(() => !!token.value)

  async function login(credentials: LoginCredentials) {
    const { data } = await loginApi(credentials)
    token.value = data.token
    user.value  = data.user
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))

    const rol = data.user?.rol.toLocaleLowerCase()
    const ruta = RUTA_POR_ROL[rol] ?? '/no-autorizado'
    router.push(ruta)
  }

  function logout() {
    token.value = null
    user.value  = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/auth/login')
  }

  return { token, user, isAuthenticated, login, logout }
})