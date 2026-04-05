  import { defineStore } from 'pinia'
  import { ref } from 'vue'
  import type { Ubicacion } from '../types/ubicacion'
  import { getUbicaciones } from '../api/ubicacion' 

  export const useUbicacionStore = defineStore('ubicaciones', () => {
    const ubicaciones = ref<Ubicacion[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function fetchUbicaciones() {
      loading.value = true
      error.value = null
      try {
        ubicaciones.value = await getUbicaciones()
      } catch (e: any) {
        error.value = e.response?.data?.error || 'Error al obtener ubicaciones'
      } finally {
        loading.value = false
      }
    }

    return {
      loading, error, fetchUbicaciones, ubicaciones
      // editUsuario, removeUsuario 
    }
  })
