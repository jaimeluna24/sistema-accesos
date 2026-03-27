<script setup lang="ts">
import { useRoute } from 'vue-router'
import { usePaseStore } from '../../services/paseService'
import { onMounted } from 'vue'

const route = useRoute()
const id = route.params.id

const paseStore = usePaseStore()
onMounted(async () => {
  await paseStore.fetchPase(id as string)
})
</script>

<template>
    <div>
        <h1>Detalles del Pase</h1>
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
                <v-text-field  :model-value="paseStore.paseDetalle?.tipo_pase_id" readonly label="Tipo de Pase" variant="outlined" />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field  :model-value="paseStore.paseDetalle?.duracion" readonly label="Duración*" variant="outlined" />
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field  :model-value="paseStore.paseDetalle?.tipo_pase_id" readonly
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
            <!-- <v-btn text="Cancelar" variant="plain" @click="cancelar" />
            <v-btn color="primary" text="Guardar" variant="tonal" :loading="loading" @click="generarPase" /> -->
          </v-card-actions>
        </v-form>
    </div>
</template>

<style scoped></style>