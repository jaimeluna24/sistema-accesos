import api from '../api/index'
import type { Pase, PaseData, PaseResponse  } from '../types/pase'

export const getPases = async (): Promise<Pase[]> => {
  const { data } = await api.get<Pase[]>('/pases')
  console.log('aqui', data)
  return data
}

export const createPase = async (pase: PaseData): Promise<PaseResponse> => {
  const { data } = await api.post<PaseResponse>('/pases', pase)
  return data
}