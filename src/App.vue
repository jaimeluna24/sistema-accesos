<script setup lang="ts">
import { useLoaderStore } from './services/loader'
const loaderStore = useLoaderStore()
</script>

<template>
   <UApp>
   <!-- Loader global -->
    <v-overlay :model-value="loaderStore.loading" persistent z-index="9999"
      style="display: flex; align-items: center; justify-content: center;">
      <v-progress-circular indeterminate color="primary" size="64" />
    </v-overlay>
 <router-view />
   </UApp>
</template>
