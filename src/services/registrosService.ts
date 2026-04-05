  import { defineStore } from 'pinia'
  import { ref } from 'vue'
//   import type { Pase, PaseData, PaseResponse } from '../types/pase'
  import type { DataRegistro, Registro, RegistrosResponse } from '../types/registros'
  import { createRegistro, getRegistros } from '../api/registros'
//   import { createPase, getPases, detailPase } from '../api/pase'

  export const useRegistroStore = defineStore('registros', () => {
    const dataRegistros = ref<DataRegistro[]>([])
    const registros = ref<Registro[]>([])
    // const paseDetalle = ref<Pase | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function fetchRegistros() {
      loading.value = true
      error.value = null
      try {
        registros.value = await getRegistros()
      } catch (e: any) {
        error.value = e.response?.data?.error || 'Error al obtener los registros'
      } finally {
        loading.value = false
      }
    }


    async function addRegistros(registro: DataRegistro) {
    loading.value = true
    try {
      const nuevo: RegistrosResponse = await createRegistro(registro)
      dataRegistros.value.push(nuevo.nuevoPase)
      return { success: true, message: nuevo.message }
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Error al crear el pase'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

    return {
      loading, error, 
      addRegistros, 
      fetchRegistros, 
      registros, 
      dataRegistros
    }
  })
