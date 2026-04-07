<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../services/authService'
import type { LoginCredentials } from '../../types/auth'

const visible = ref(false)
const auth = useAuthStore()

const nombre_usuario = ref('')
const contrasenia = ref('')
const loading = ref(false)
const errorMsg = ref < string | null > (null)

async function login() {

  const credentials: LoginCredentials = {
    usuario: nombre_usuario.value,
    contrasenia: contrasenia.value
  }

  if (!nombre_usuario.value || !contrasenia.value) {
    alert('Completa los campos')
    return
  }

  errorMsg.value = null
  loading.value  = true

  try {
    await auth.login(credentials)
  } catch (e: any) {
  console.log('error response:', e.response)
    errorMsg.value = e.response?.data?.message || 'Credenciales inválidas'
  } finally {
    loading.value = false
  }

}
</script>

<template>
  <div>

    <v-img class="mx-auto my-6" max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg" />

    <v-card class="mx-auto pa-12 pb-8" elevation="3" max-width="448" min-width="350" width="400" rounded="lg">

      <div class="text-body-large text-medium-emphasis">
        Usuario
      </div>

      <v-text-field v-model="nombre_usuario" density="compact" placeholder="Usuario"
        prepend-inner-icon="mdi-account-outline" variant="outlined" />

      <div class="text-body-large text-medium-emphasis d-flex align-center justify-space-between">
        Contraseña
      </div>

      <v-text-field v-model="contrasenia" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'" density="compact" placeholder="Ingrese su contraseña"
        prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible" />

      <v-btn class="mb-8" color="blue" size="large" variant="tonal" type="button" block :loading="loading" @click="login">
        Iniciar Sesión
      </v-btn>

    </v-card>
  </div>
</template>