import api from '../api/index'
import type { Usuario, UsuarioData, UsuarioResponse } from '../types/usuario'

export const getUsuarios = async (): Promise<Usuario[]> => {
  const { data } = await api.get<Usuario[]>('auth/usuarios')
  return data
}

export const createUsuario = async (usuario: UsuarioData): Promise<UsuarioResponse> => {
  const { data } = await api.post<UsuarioResponse>('auth/usuarios', usuario)
  return data
}
// export const updateUsuario = async (id: number, usuario: Partial<Usuario>): Promise<Usuario> => {
//   const { data } = await api.put<Usuario>(`/usuarios/${id}`, usuario)
//   return data
// }

// export const deleteUsuario = async (id: number): Promise<void> => {
//   await api.delete(`/usuarios/${id}`)
// }