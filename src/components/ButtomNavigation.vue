<template>
    <v-bottom-navigation
      v-model="active"
      grow
      app
    >
    <!-- Dashboard -->
      <v-btn
        :to="{ name: 'Dashboard' }"
        value="Dashboard"
        icon
         exact
          v-if="usuario.rol == 'administrador' || usuario.rol == 'lector' || usuario.rol == 'gestor'"
      >
        <v-icon>mdi-chart-bar-stacked</v-icon>
        <span>Dashboard</span>
      </v-btn>
      <!-- Registros -->
      <v-btn
        :to="{ name: 'Registros' }"
        value="Registros"
        icon
         exact
          v-if="usuario.rol == 'administrador' || usuario.rol == 'lector' || usuario.rol == 'gestor'"
      >
        <v-icon>mdi-history</v-icon>
        <span>Registros</span>
      </v-btn>

      <!-- Escanear QR -->
      <v-btn
        :to="{ name: 'EscanearPase' }"
        value="EscanearPase"
        icon
        exact
        v-if="usuario.rol == 'administrador' || usuario.rol == 'guardia'"
      >
        <v-icon>mdi-qrcode-scan</v-icon>
        <span>Escanear</span>
      </v-btn>

      <!-- Generar Pase -->
      <v-btn
        :to="{ name: 'GenerarPase' }"
        value="GenerarPase"
        icon
         exact
         v-if="usuario.rol == 'administrador' || usuario.rol == 'lector' || usuario.rol == 'gestor' || usuario.rol == 'normal'"
      >
        <v-icon>mdi-qrcode</v-icon>
        <span>Generar Pase</span>
      </v-btn>

      <!-- Usuarios -->
      <v-btn
        :to="{ name: 'Usuarios' }"
        value="Usuarios"
        icon
        exact
         v-if="usuario.rol == 'administrador'"
      >
        <v-icon>mdi-account-group</v-icon>
        <span>Usuarios</span>
      </v-btn>
    </v-bottom-navigation>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const active = ref('Dashboard')
const route = useRoute()
const usuario = JSON.parse(localStorage.getItem('user') || '{}')

watch(
  () => route.matched[route.matched.length - 1]?.name,
  (newName) => {
    if (newName) active.value = newName.toString()
  },
  { immediate: true }
)
</script>