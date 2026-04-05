import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { login as loginApi } from '../api/auth'
import type { LoginCredentials, AuthUser } from '../types/auth'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user  = ref<AuthUser | null>(JSON.parse(localStorage.getItem('user') || 'null'))
  const router = useRouter()

  const isAuthenticated = computed(() => !!token.value)

  async function login(credentials: LoginCredentials) {
    const { data } = await loginApi(credentials)
    token.value = data.token
    user.value  = data.user
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    router.push('/dashboard')
  }

  function logout() {
    token.value = null
    user.value  = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  return { token, user, isAuthenticated, login, logout }
})