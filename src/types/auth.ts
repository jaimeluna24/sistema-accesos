export interface LoginCredentials {
  usuario: string
  contrasenia: string
}

export interface AuthUser {
  id: number
  nombre_usuario: string
  rol_id: number
  depto_id: number
}

export interface AuthResponse {
  token: string
  user: AuthUser
  message: string
}