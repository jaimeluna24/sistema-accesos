import api from '../api/index'
import type { Ubicacion } from '../types/ubicacion'

export const getUbicaciones = async (): Promise<Ubicacion[]> => {
  const { data } = await api.get<Ubicacion[]>('/location')
  return data
}