  import { defineStore } from 'pinia'
  import { ref } from 'vue'
  import type { Departamento } from '../types/departamentos'
  import { getDepartamentos } from '../api/departamentos' 

  export const useDepartamentoStore = defineStore('departamentos', () => {
    const departamentos = ref<Departamento[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function fetchDepartamentos() {
      loading.value = true
      error.value = null
      try {
        departamentos.value = await getDepartamentos()
      } catch (e: any) {
        error.value = e.response?.data?.error || 'Error al obtener los departamentos'
      } finally {
        loading.value = false
      }
    }

    return {
      loading, error, fetchDepartamentos, departamentos
    }
  })
