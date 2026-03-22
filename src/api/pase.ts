import api from '../api/index'
import type { Pase, PaseData } from '../types/pase'

export const getPases = async (): Promise<Pase[]> => {
  const { data } = await api.get<Pase[]>('/qr/pases')
  return data
}

export const createPase = async (pase: PaseData): Promise<PaseData> => {
  const { data } = await api.post<PaseData>('/qr/pases', pase)
  return data
}