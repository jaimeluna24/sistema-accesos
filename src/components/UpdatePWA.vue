<!-- src/components/UpdatePWA.vue -->
<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'

const { needRefresh, updateServiceWorker } = useRegisterSW()
</script>

<template>
  <v-snackbar v-model="needRefresh" :timeout="-1" color="primary">
    Nueva versión disponible
    <template #actions>
      <v-btn variant="text" @click="updateServiceWorker()">
        Actualizar
      </v-btn>
    </template>
  </v-snackbar>
</template>