<script setup lang="ts">
import { useLoaderStore } from './services/loader'
import UpdatePWA from './components/UpdatePWA.vue'
const loaderStore = useLoaderStore()
</script>

<template>
   <UApp>
   <!-- Loader global -->
    <v-overlay :model-value="loaderStore.loading" persistent z-index="9999"
      style="display: flex; align-items: center; justify-content: center;">
      <v-progress-circular indeterminate color="primary" size="64" />
    </v-overlay>
    <UpdatePWA />
 <router-view />
   </UApp>
</template>
