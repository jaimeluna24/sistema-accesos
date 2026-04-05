import api from '../api/index'
import type { DataRegistro, RegistrosResponse , Registro } from '../types/registros'

export const getRegistros = async (): Promise<Registro[]> => {
  const { data } = await api.get<Registro[]>('/registros')
  return data
}

export const createRegistro = async (registro: DataRegistro): Promise<RegistrosResponse> => {
  const { data } = await api.post<RegistrosResponse>('/registro', registro)
  return data
}