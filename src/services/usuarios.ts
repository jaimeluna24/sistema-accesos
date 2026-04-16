import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Usuario, UsuarioData, UsuarioResponse } from '../types/usuario'
import { getUsuarios, createUsuario } from '../api/usuarios'

export const useUsuarioStore = defineStore('usuarios', () => {
  const usuarios = ref<Usuario[]>([])
  const dataUsaurio = ref<UsuarioData[]>([])

  const loading  = ref(false)
  const error    = ref<string | null>(null)

  async function fetchUsuarios() {
    loading.value = true
    error.value   = null
    try {
      usuarios.value = await getUsuarios()
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Error al obtener usuarios'
    } finally {
      loading.value = false
    }
  }

    async function addUsuario(usuario: UsuarioData) {
      loading.value = true
      try {
        const nuevo: UsuarioResponse = await createUsuario(usuario)
        dataUsaurio.value.push(nuevo.nuevoUsuario)
        return { success: true, message: nuevo.message }
      } catch (e: any) {
        error.value = e.response?.data?.error || 'Error al crear el usuario'
        console.log('Error al crear el usuario:', error.value)
        return { success: false, message: error.value }
      } finally {
        loading.value = false
      }
    }

  return { usuarios, loading, error, fetchUsuarios, addUsuario, dataUsaurio }
})