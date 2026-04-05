<script setup lang="ts">
import { useRoute } from 'vue-router'
import { usePaseStore } from '../../services/paseService'
import { onMounted } from 'vue'
import { ref } from 'vue'
import EntradaSalidaModal from '../../components/EntradaSalidaPase.vue'

const route = useRoute()
const id = route.params.id
const usuario = JSON.parse(localStorage.getItem('user') || '{}')
const creado_por = ref(usuario.id ? parseInt(usuario.id) : 0)
const modalDialog = ref(false)
const paseSeleccionado = ref<string | null>(null)
const codigoSeleccionado = ref<string | null>(null)
const tipoSeleccionado = ref<string | null>(null)
const usuarioSeleccionado = ref<number | null>(null)
const paseStore = usePaseStore()

onMounted(async () => {
  await paseStore.fetchPase(id as string)
})

function mostrarModalEntrada(tipo: string) {
  paseSeleccionado.value = paseStore.paseDetalle?.id || null
  codigoSeleccionado.value = paseStore.paseDetalle?.codigo || null
  tipoSeleccionado.value = tipo
  usuarioSeleccionado.value = creado_por.value
  modalDialog.value = true
}

</script>

<template>
    <div style="padding: 12px 16px; margin-top: 15px;">
  <h1 style="font-size: clamp(18px, 4vw, 26px); font-weight: 500; margin: 0 0 4px;">
    Detalles de pase
  </h1>
  <p style="color: grey; margin: 0; font-size: 14px;">
    Por favor registre el Ingreso/Salida 
  </p>
</div>

    <div>
        <v-form ref="form">
          <v-card-text>
            <v-row density="comfortable">
                <v-col cols="12" md="6" sm="6">
                    <v-text-field :model-value="paseStore.paseDetalle?.nombre_visitante"  readonly
                    label="Nombres*" variant="outlined" />
                </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-text-field :model-value="paseStore.paseDetalle?.apellido_visitante" readonly 
                  label="Apellidos*" variant="outlined" />
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-text-field  :model-value="paseStore.paseDetalle?.dni" readonly 
                   label="N. Identidad*" variant="outlined" />
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-text-field  :model-value="paseStore.paseDetalle?.telefono" readonly label="Teléfono" variant="outlined" />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field  :model-value="paseStore.paseDetalle?.tipo_pase.nombre_pase" readonly label="Tipo de Pase" variant="outlined" />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field  :model-value="paseStore.paseDetalle?.duracion" readonly label="Duración*" variant="outlined" />
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field  :model-value="paseStore.paseDetalle?.duracion_unidad" readonly
                   label="Unidad de duración*" variant="outlined" />
              </v-col>
              <v-col cols="12" md="12" sm="6">
                <v-text-field :model-value="paseStore.paseDetalle?.motivo" readonly label="Motivo*"
                  variant="outlined" />
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn text="Marcar Salida" color="error" variant="tonal" @click="mostrarModalEntrada('salida')"  />
            <v-btn color="success" text="Marcar Entrada" variant="tonal" @click="mostrarModalEntrada('entrada')" />
          </v-card-actions>
        </v-form>
    </div>
<EntradaSalidaModal v-model="modalDialog" :pase-id="paseSeleccionado" :tipo="tipoSeleccionado" :usuario-id="usuarioSeleccionado" :codigo="codigoSeleccionado" />

</template>

<style scoped></style>