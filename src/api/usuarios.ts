import api from '../api/index'
import type { Usuario } from '../types/usuario'

export const getUsuarios = async (): Promise<Usuario[]> => {
  const { data } = await api.get<Usuario[]>('/usuarios')
  return data
}

export const createUsuario = async (usuario: Omit<Usuario, 'id' | 'roles' | 'departamento'>): Promise<Usuario> => {
  const { data } = await api.post<Usuario>('/usuarios', usuario)
  return data
}

export const updateUsuario = async (id: number, usuario: Partial<Usuario>): Promise<Usuario> => {
  const { data } = await api.put<Usuario>(`/usuarios/${id}`, usuario)
  return data
}

export const deleteUsuario = async (id: number): Promise<void> => {
  await api.delete(`/usuarios/${id}`)
}