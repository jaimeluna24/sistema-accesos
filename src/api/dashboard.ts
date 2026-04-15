import api from '../api/index'
import type { PasesData, RegistrosData  } from '../types/dashboard'

export const getPasesStats = async (): Promise<PasesData> => {
  const { data } = await api.get<PasesData>('/pases/stats')
  return data
}

export const getRegistrosStats = async (): Promise<RegistrosData> => {
  const { data } = await api.get<RegistrosData>('/registros/stats')
  return data
}
