import api from '../api/index'
import type { PasesData, RegistrosData, StatsData  } from '../types/dashboard'

export const getPasesStats = async (): Promise<PasesData> => {
  const { data } = await api.get<PasesData>('/pases/stats')
  return data
}

export const getRegistrosStats = async (): Promise<RegistrosData> => {
  const { data } = await api.get<RegistrosData>('/registros/stats')
  return data
}

export const getDataStats = async (): Promise<StatsData> => {
  const { data } = await api.get<StatsData>('/registros/stats/daily')
  return data
}