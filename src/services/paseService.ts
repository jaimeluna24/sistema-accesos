import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Pase, PaseData } from '../types/pase'
import { createPase, getPases } from '../api/pase'

export const usePaseStore = defineStore('pases', () => {
  const dataPases = ref<PaseData[]>([])
  const pases = ref<Pase[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchPases() {
    loading.value = true
    error.value = null
    try {
      pases.value = await getPases()
      console.log(pases.value)
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Error al obtener pases'
    } finally {
      loading.value = false
    }
  }


  async function addPase(pase: PaseData) {
    loading.value = true
    try {
      const nuevo = await createPase(pase)
      dataPases.value.push(nuevo)
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Error al crear el pase'
    } finally {
      loading.value = false
    }
  }


  return {
    loading, error, addPase, fetchPases, pases
    // editUsuario, removeUsuario 
  }
})
