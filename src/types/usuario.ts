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
}