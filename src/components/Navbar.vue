<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'


const active = ref('Dashboard')
const route = useRoute()

watch(
  () => route.matched[route.matched.length - 1]?.name,
  (newName) => {
    if (newName) active.value = newName.toString()
  },
  { immediate: true }
)

const { smAndDown } = useDisplay()
</script>

<template>
    <v-app-bar :elevation="5">
  <template v-slot:default>
    <div style="display: flex; align-items: center; width: 100%;">
      
      <!-- Título izquierda -->
      <span style="font-weight: 700; font-size: 20px; min-width: 100px; padding-left: 15px;">Accesos</span>

      <!-- Botones centrados -->
      <div v-if="!smAndDown" style="flex: 1; display: flex; justify-content: center; gap: 4px; align-items: center;">
      <v-btn
        :to="{ name: 'Dashboard' }"
        value="Dashboard"
        exact
        :color="$route.name === 'Dashboard' ? 'primary' : ''"
      >
        <v-icon>mdi-history</v-icon>
        <span>Registros</span>
      </v-btn>

      <!-- Escanear QR -->
      <v-btn
        :to="{ name: 'EscanearPase' }"
        value="EscanearPase"
        :color="$route.name === 'EscanearPase' ? 'primary' : ''"
        exact
      >
        <v-icon>mdi-qrcode-scan</v-icon>
        <span>Escanear</span>
      </v-btn>

      <!-- Generar Pase -->
      <v-btn
        :to="{ name: 'GenerarPase' }"
        value="GenerarPase"
        :color="$route.name === 'GenerarPase' ? 'primary' : ''"
         exact
      >
        <v-icon>mdi-qrcode</v-icon>
        <span>Generar Pase</span>
      </v-btn>

      <!-- Usuarios -->
      <v-btn
        :to="{ name: 'Usuarios' }"
        value="Usuarios"
        :color="$route.name === 'Usuarios' ? 'primary' : ''"
        exact
      >
        <v-icon>mdi-account-group</v-icon>
        <span>Usuarios</span>
      </v-btn>
      </div>

      <!-- Botón derecha -->
      

    </div>
  </template>
  <template v-slot:append>
    <v-btn icon><v-icon>mdi-dots-vertical</v-icon></v-btn>
  </template>
</v-app-bar>
</template>


<style scoped>

</style>