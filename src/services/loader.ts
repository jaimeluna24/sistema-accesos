import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoaderStore = defineStore('loader', () => {
  const loading = ref(false)

  const iniciar = () => loading.value = true
  const detener = () => loading.value = false

  return { loading, iniciar, detener }
})