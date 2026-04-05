export interface TipoPase {
    id: number,
    nombre_pase: string
}

export interface Pase {
    id: string
    codigo: string
    nombre_visitante: string
    apellido_visitante: string
    telefono: string
    motivo: string
    tipo_pase_id: number
    creado_por: number | null
    duracion: number
    duracion_unidad: string
    dni: string,
    status: boolean,
    created_at: string,
    tipo_pase: TipoPase
}

export interface PaseData {
    nombre_visitante: string
    apellido_visitante: string
    telefono: string
    motivo: string
    tipo_pase_id: number | null
    creado_por: number | null
    duracion: number
    duracion_unidad: string
    dni: string
}

export interface PaseResponse {
  nuevoPase: PaseData
  message: string
}