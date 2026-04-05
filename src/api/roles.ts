import api from '../api/index'
import type { Rol } from '../types/roles'

export const getRoles = async (): Promise<Rol[]> => {
  const { data } = await api.get<Rol[]>('/roles')
  return data
}