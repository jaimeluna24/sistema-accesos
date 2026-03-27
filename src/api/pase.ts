import api from '../api/index'
import type { Pase, PaseData, PaseResponse  } from '../types/pase'

export const getPases = async (): Promise<Pase[]> => {
  const { data } = await api.get<Pase[]>('/pases')
  return data
}

export const createPase = async (pase: PaseData): Promise<PaseResponse> => {
  const { data } = await api.post<PaseResponse>('/pases', pase)
  return data
}

export const detailPase = async (id: string): Promise<Pase> => {
  const { data } = await api.get<Pase>(`/pases/${id}`)
  return data
}