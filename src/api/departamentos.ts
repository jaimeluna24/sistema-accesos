import api from '../api/index'
import type { Departamento } from '../types/departamentos'

export const getDepartamentos = async (): Promise<Departamento[]> => {
  const { data } = await api.get<Departamento[]>('/departamentos')
  return data
}