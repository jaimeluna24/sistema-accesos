import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Usuario } from '../types/usuario'
import { getUsuarios, createUsuario } from '../api/usuarios'

export const useUsuarioStore = defineStore('usuarios', () => {
  const usuarios = ref<Usuario[]>([])
  const loading  = ref(false)
  const error    = ref<string | null>(null)

  async function fetchUsuarios() {
    loading.value = true
    error.value   = null
    try {
      usuarios.value = await getUsuarios()
      console.log(usuarios.value)
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Error al obtener usuarios'
    } finally {
      loading.value = false
    }
  }

  async function addUsuario(usuario: Omit<Usuario, 'id' | 'roles' | 'departamento'>) {
    loading.value = true
    try {
      const nuevo = await createUsuario(usuario)
      usuarios.value.push(nuevo)
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Error al crear usuario'
    } finally {
      loading.value = false
    }
  }

  // async function editUsuario(id: number, usuario: Partial<Usuario>) {
  //   loading.value = true
  //   try {
  //     const actualizado = await updateUsuario(id, usuario)
  //     const index = usuarios.value.findIndex(u => u.id === id)
  //     if (index !== -1) usuarios.value[index] = actualizado
  //   } catch (e: any) {
  //     error.value = e.response?.data?.error || 'Error al actualizar usuario'
  //   } finally {
  //     loading.value = false
  //   }
  // }

  // async function removeUsuario(id: number) {
  //   loading.value = true
  //   try {
  //     await deleteUsuario(id)
  //     usuarios.value = usuarios.value.filter(u => u.id !== id)
  //   } catch (e: any) {
  //     error.value = e.response?.data?.error || 'Error al eliminar usuario'
  //   } finally {
  //     loading.value = false
  //   }
  // }

  return { usuarios, loading, error, fetchUsuarios, addUsuario, 
    // editUsuario, removeUsuario 
  }
})