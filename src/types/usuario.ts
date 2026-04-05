export interface Rol {
  nombre: string
  descripcion: string | null
}

export interface Departamento {
  nombre_depto: string
  descripcion: string | null
}

export interface Usuario {
  id: number
  nombre_usuario: string
  rol_id: number
  depto_id: number
  activo: boolean
  roles: Rol
  departamento: Departamento
  created_at: string
}

export interface UsuarioData {
  nombre_usuario: string
  contrasenia: string
  rol_id: number
  depto_id: number
}

export interface UsuarioResponse {
  nuevoUsuario: UsuarioData
  message: string
}