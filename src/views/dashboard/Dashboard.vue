<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useRegistroStore } from '../../services/registrosService'
import { onMounted } from 'vue'

const { smAndDown } = useDisplay()
const search = ref('')
const registroStore = useRegistroStore();

onMounted(async () => {
  await registroStore.fetchRegistros()
})

const formatearFecha = (fecha: string): string => {
  return new Date(fecha).toLocaleString('es-HN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}

const headers = [
  { title: 'Codigo', key: 'pases.codigo' },
  {
    title: 'Nombre Completo',
    key: 'nombre_completo',
    value: (item: any) => `${item.pases.nombre_visitante} ${item.pases.apellido_visitante}`
  },
  { title: 'Tipo', key: 'tipo' },
  { title: 'Ubicación', key: 'location.nombre_location' },
  { title: 'Registrado Por', key: 'usuarios.nombre_usuario' },
  {
    title: 'Fecha y Hora',
    key: 'fecha',
    value: (item: any) => formatearFecha(item.created_at)
  },

  { title: 'Acciones', key: 'actions', sortable: false }
]

const paginaActual = ref(1)
const porPagina = 10
const totalPaginas = computed(() => Math.ceil(registroStore.registros.length / porPagina))
const registrosPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * porPagina
  return registroStore.registros.slice(inicio, inicio + porPagina)
})
</script>

<template>
  <div class="d-flex justify-space-between p-20">
    <div style="padding: 12px 16px; margin-top: 15px;">
      <h1 style="font-size: clamp(18px, 4vw, 26px); font-weight: 500; margin: 0 0 4px;">
        Dashboard
      </h1>
    </div>
  </div>
  <div>
    <div v-if="smAndDown" style="padding: 8px;">
      <div v-for="registros in registrosPaginados" :key="registros.id"
        style=" border: 0.5px solid #e0e0e0; border-radius: 12px; padding: 12px 14px; margin-bottom: 10px;">

        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <span style="font-size: 15px; font-weight: 500;">{{ registros.pases.codigo }}</span>
            <p style="font-size: 13px; color: #666; margin: 2px 0 0;">
              {{ registros.pases.nombre_visitante }} {{ registros.pases.apellido_visitante }}
            </p>
          </div>
          <v-chip :color="registros.tipo === 'entrada' ? 'success' : 'error'" size="small" class="text-uppercase" label>
            {{ registros.tipo === 'entrada' ? 'entrada' : 'salida' }}
          </v-chip>
        </div>

        <div style="display: flex; justify-content: space-around; gap: 8px; margin-top: 10px;">
          <v-btn prepend-icon="mdi-information-slab-box" variant="outlined" color="warning" size="small" flex>Ver
            detalles</v-btn>
        </div>
      </div>

      <v-pagination v-model="paginaActual" :length="totalPaginas" density="compact" />
    </div>
    <div v-else>
      <v-card flat>
        <v-card-title class="d-flex align-center pe-2">
          <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
          Historial de Pases Utilizados
          <v-spacer></v-spacer>
          <v-text-field v-model="search" density="compact" label="Buscar..." prepend-inner-icon="mdi-magnify"
            variant="solo-filled" flat hide-details single-line></v-text-field>
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table v-model:search="search" :items="registroStore.registros" :loading="registroStore.loading"
          :headers="headers">

          <template v-slot:item.tipo="{ item }">
            <div class="text-start">
              <v-chip :color="item.tipo === 'entrada' ? 'success' : 'error'" :text="item.tipo ? 'entrada' : 'salida'"
                class="text-uppercase" size="small" label>
                {{ item.tipo }}</v-chip>
            </div>
          </template>
          <template v-slot:item.actions="{ }">
            <div class="d-flex gap-4">
              <v-btn prepend-icon="mdi-information-slab-box" variant="outlined" color="orange" size="small" flex>Ver
                detalles</v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>
<style scoped></style>