  import { defineStore } from 'pinia'
  import { ref } from 'vue'
  import type { PasesData, RegistrosData } from '../types/dashboard'
  import { getPasesStats, getRegistrosStats } from '../api/dashboard'

  export const useStatsStore = defineStore('stats', () => {
    const pasesStats = ref<PasesData | null>(null)
    const registrosStats = ref<RegistrosData | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function fetchPasesStats() {
      loading.value = true
      error.value = null
      try {
        pasesStats.value = await getPasesStats()
      } catch (e: any) {
        error.value = e.response?.data?.error || 'Error al obtener pases'
      } finally {
        loading.value = false
      }
    }

    async function fetchRegistrosStats() {
      loading.value = true
      error.value = null
      try {
        registrosStats.value = await getRegistrosStats()
      } catch (e: any) {
        error.value = e.response?.data?.error || 'Error al obtener registros'
      } finally {
        loading.value = false
      }
    }

    return {
      loading, error, fetchPasesStats, pasesStats, fetchRegistrosStats, registrosStats
    }
  })
