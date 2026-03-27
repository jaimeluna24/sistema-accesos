  import { defineStore } from 'pinia'
  import { ref } from 'vue'
  import type { Pase, PaseData, PaseResponse } from '../types/pase'
  import { createPase, getPases, detailPase } from '../api/pase'

  export const usePaseStore = defineStore('pases', () => {
    const dataPases = ref<PaseData[]>([])
    const pases = ref<Pase[]>([])
    const paseDetalle = ref<Pase | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function fetchPases() {
      loading.value = true
      error.value = null
      try {
        pases.value = await getPases()
        console.log('aqui', pases)
      } catch (e: any) {
        error.value = e.response?.data?.error || 'Error al obtener pases'
      } finally {
        loading.value = false
      }
    }


    async function addPase(pase: PaseData) {
    loading.value = true
    try {
      const nuevo: PaseResponse = await createPase(pase)
      dataPases.value.push(nuevo.nuevoPase)
      return { success: true, message: nuevo.message }
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Error al crear el pase'
      console.log('error:', error.value)
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

    async function fetchPase(id: string) {
      loading.value = true
      error.value = null
      try {
        paseDetalle.value = await detailPase(id)
      } catch (e: any) {
        error.value = e.response?.data?.error || 'Error al obtener el pase'
      } finally {
        loading.value = false
      }
    }

    return {
      loading, error, addPase, fetchPases, pases, dataPases, fetchPase, paseDetalle
      // editUsuario, removeUsuario 
    }
  })
