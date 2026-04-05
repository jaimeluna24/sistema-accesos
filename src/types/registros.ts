export interface DataRegistro {
    id_pase: string
    tipo: string
    usuario_id: number
    locacion_id: number | null
}

export interface RegistrosResponse {
  nuevoPase: DataRegistro
  message: string
}

export interface PaseRegistro {
  motivo: string
  telefono: string
  dni: string
  nombre_visitante: string
  apellido_visitante: string
  codigo: string
}

export interface UsuarioRegistro {
  nombre_usuario: string
}

export interface LocacionRegistro{
  nombre_locacion: string
}

export interface Registro {
  id: number
  pase_id: string
  tipo: string
  usuario_id: number
  locacion_id: number
  pases: PaseRegistro
  usuarios: UsuarioRegistro
  location: LocacionRegistro
}
