import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PasesData, RegistrosData, DailyData, AccessData } from '../types/dashboard'
import { getPasesStats, getRegistrosStats, getDataStats } from '../api/dashboard'

export const useStatsStore = defineStore('stats', () => {
  const pasesStats = ref<PasesData | null>(null)
  const registrosStats = ref<RegistrosData | null>(null)
  const dailyData = ref<DailyData[]>([])
  const accessData = ref<AccessData[]>([])
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

  async function fetchDataStats() {
    loading.value = true
    error.value = null
    try {
      const result = await getDataStats()
      dailyData.value = result.dailyData   // para el bar chart
      accessData.value = result.accessData // para el donut chart
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Error al obtener los datos'
    } finally {
      loading.value = false
    }
  }

  return {
    loading, error, fetchPasesStats, pasesStats, fetchRegistrosStats, registrosStats, fetchDataStats, dailyData, accessData
  }
})
