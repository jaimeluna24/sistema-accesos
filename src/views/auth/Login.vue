<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../services/authService'
import type { LoginCredentials } from '../../types/auth'
import logo from '../../assets/LogoACHNormal.png'
const visible = ref(false)
const auth = useAuthStore()

const nombre_usuario = ref('')
const contrasenia = ref('')
const loading = ref(false)
const errorMsg = ref<string | null>(null)

const snackbar = ref(false)
const text = ref('')
const timeout = ref(4000)
const typeAlert = ref('')
const typeIconAlert = ref('')
const titleAlert = ref('')

async function login() {

  const credentials: LoginCredentials = {
    usuario: nombre_usuario.value,
    contrasenia: contrasenia.value
  }

  if (!nombre_usuario.value || !contrasenia.value) {
    text.value = 'Credenciales incompletas'
    titleAlert.value = 'Error'
    typeAlert.value = 'error'
    typeIconAlert.value = '$error'
    snackbar.value = true
    return
  }

  errorMsg.value = null
  loading.value = true

  try {
    await auth.login(credentials)
    text.value = 'Pase creado exitosamente'
    titleAlert.value = 'Éxito'
    typeAlert.value = 'success'
    typeIconAlert.value = '$success'
    snackbar.value = true
  } catch (e: any) {
    errorMsg.value = e.response?.data?.message || 'Credenciales inválidas'
    text.value = errorMsg.value || 'Error al iniciar sesión'
    titleAlert.value = 'Error'
    typeAlert.value = 'error'
    typeIconAlert.value = '$error'
    snackbar.value = true
  } finally {
    loading.value = false
  }

}
</script>

<template>
  <div>

    <v-img class="mx-auto my-6" max-width="250" :src="logo" />

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
      <v-btn type="button" class="mb-8" color="blue" size="large" variant="tonal" block :loading="loading" @click="login">
        Iniciar Sesión
      </v-btn>
    </v-card>
    <v-snackbar location="bottom end" :color="typeAlert" :prepended-icon="typeIconAlert" :title="titleAlert"
      v-model="snackbar" :timeout="timeout">
      {{ text }}

      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="snackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>