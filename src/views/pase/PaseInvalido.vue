<template>
  <v-empty-state icon="$error" style="margin-top: 30px;">
    <template v-slot:media>
      <v-icon color="surface-variant"></v-icon>
    </template>

    <template v-slot:headline>
      <div class="text-headline-large">
        ¡Ocurrio un error!
      </div>
    </template>

    <template v-slot:title>
      <div class="text-title-large">
        Pase expirado
      </div>
    </template>

    <template v-slot:text>
      <div class="text-medium-emphasis text-body-small">
        El pase utilizado ha expirado, por favor comunicate con el encargado para recibir un nuevo pase.
      </div>
    </template>
  </v-empty-state>

  <div style="display: flex; justify-content: center;">
  <v-btn color="primary" @click="router.push({ name: 'EscanearPase' })">
  Regresar
</v-btn>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

</script>