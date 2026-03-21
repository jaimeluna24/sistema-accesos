import api from '../api/index'
import type { LoginCredentials, AuthResponse } from '../types/auth'

export const login = (credentials: LoginCredentials) =>
  api.post<AuthResponse>('/login', credentials)

export const logout = () =>
  api.post('/auth/logout')