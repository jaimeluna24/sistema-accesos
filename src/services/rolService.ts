  import { defineStore } from 'pinia'
  import { ref } from 'vue'
  import type { Rol } from '../types/roles'
  import { getRoles } from '../api/roles' 

  export const useRolStore = defineStore('roles', () => {
    const roles = ref<Rol[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function fetchRoles() {
      loading.value = true
      error.value = null
      try {
        roles.value = await getRoles()
      } catch (e: any) {
        error.value = e.response?.data?.error || 'Error al obtener los roles'
      } finally {
        loading.value = false
      }
    }

    return {
      loading, error, fetchRoles, roles
    }
  })
