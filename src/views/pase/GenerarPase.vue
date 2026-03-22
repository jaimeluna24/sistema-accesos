<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import { type PaseData } from '../../types/pase'
import { VForm } from 'vuetify/components'
import { usePaseStore } from '../../services/paseService'
import { onMounted } from 'vue'
import QrModal from '../../components/QRModal.vue'

const form = ref<InstanceType<typeof VForm> | null>(null)

const { smAndDown } = useDisplay()
const search = ref('')
const dialog = ref(false)

const usuario = JSON.parse(localStorage.getItem('user') || '{}')
const creado_por = ref(usuario.id ? parseInt(usuario.id) : 0)

const nombre_visitante = ref('')
const apellido_visitante = ref('')
const telefono = ref('')
const motivo = ref('')
const tipo_pase_id = ref(null)
const duracion = ref(1)
const duracion_unidad = ref('Día')
const dni = ref('')
const paseStore = usePaseStore();

const loading = ref(false)
const errorMsg = ref<string | null>(null)

onMounted(async () => {
  await paseStore.fetchPases()
})

const generarPase = async () => {
  if (!form.value) return

  const { valid } = await form.value.validate()
  if (!valid) return

  errorMsg.value = null
  loading.value = true

  const dataPase: PaseData = {
    nombre_visitante: nombre_visitante.value,
    apellido_visitante: apellido_visitante.value,
    telefono: telefono.value,
    tipo_pase_id: tipo_pase_id.value,
    motivo: motivo.value,
    creado_por: creado_por.value,
    duracion: duracion.value,
    duracion_unidad: duracion_unidad.value,
    dni: dni.value
  }
  console.log(dataPase)

  try {
    await paseStore.addPase(dataPase)
  } catch (e: any) {
    console.log('error completo:', e)
    console.log('error response:', e.response)
    errorMsg.value = e.response?.data?.message || 'Error al crear el pase'
  } finally {
    loading.value = false
  }
}

const cancelar = () => {
  if (!form.value) return
  form.value.reset()
  dialog.value = false
}

const headers = [
  { title: 'Codigo', key: 'codigo' },
  { title: 'Nombre', key: 'nombre_visitante' },
  { title: 'Apellido', key: 'apellido_visitante' },
  { title: 'Tipo de Pase', key: 'tipo_pase.nombre_pase' },
  { title: 'Estado', key: 'status' },
  { title: 'Fecha de Creación', key: 'created_at' },

  // columna que NO existe en los datos
  { title: 'Acciones', key: 'actions', sortable: false }
]

const tipo_pases = [
  {
    id: 1,
    nombre_tipo_pase: 'Invitado'
  },
  {
    id: 2,
    nombre_tipo_pase: 'Empleado'
  }
]

console.log(smAndDown)

const qrDialog = ref(false)
const paseSeleccionado = ref<number | null>(null)

function mostrarQr(id: number) {
  paseSeleccionado.value = id
  qrDialog.value = true
  console.log('Ejecutando')
}
</script>

<template>
  <div class="d-flex justify-space-between p-20">
    <div>
      <h1>Generar Pase</h1>
    </div>
    <div class="d-flex justify-center align-center">
      <v-btn prepend-icon="mdi-qrcode" @click="dialog = true">
        Generar
      </v-btn>
    </div>
    <v-dialog v-model="dialog" max-width="600" persistent>
      <v-card prepend-icon="mdi-qrcode" title="Generar Pase">
        <v-form ref="form">
          <v-card-text>
            <v-row density="comfortable">
              <v-col cols="12" md="6" sm="6">
                <v-text-field :rules="[v => !!v || 'El nombre es requerido']" v-model="nombre_visitante"
                  label="Nombres*" variant="outlined" />
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-text-field :rules="[v => !!v || 'El apellido es requerido']" v-model="apellido_visitante"
                  label="Apellidos*" variant="outlined" />
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-text-field :rules="[v => !!v || 'La identidad es requerida']" v-model="dni"
                  hint="Ej. 0000-0000-00000" label="N. Identidad*" variant="outlined" />
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-text-field v-model="telefono" hint="Ej. 0000-0000" label="Teléfono" variant="outlined" />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-select :rules="[v => !!v || 'Seleccione un tipo']" v-model="tipo_pase_id" :items="tipo_pases"
                  placeholder="Seleccionar..." item-title="nombre_tipo_pase" item-value="id" label="Tipo de pase*"
                  variant="outlined" />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-number-input :rules="[v => !!v || 'La duración es requerida']" hint="Solo permite números" :min="1"
                  control-variant="hidden" v-model="duracion" label="Duración*" variant="outlined" />
              </v-col>
              <v-col cols="12" sm="4">
                <v-select :rules="[v => !!v || 'Seleccione una unidad']" v-model="duracion_unidad"
                  :items="['dias', 'horas']" label="Unidad de duración*" variant="outlined" />
              </v-col>
              <v-col cols="12" md="12" sm="6">
                <v-text-field :rules="[v => !!v || 'El motivo es requerido']" v-model="motivo" label="Motivo*"
                  variant="outlined" />
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn text="Cancelar" variant="plain" @click="cancelar" />
            <v-btn color="primary" text="Guardar" variant="tonal" :loading="loading" @click="generarPase" />
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
  <div>
    <div v-if="smAndDown">
      <v-list lines="one">
        <v-list-item v-for="n in 3" :key="n" :title="'Item ' + n"
          subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"></v-list-item>
      </v-list>
    </div>
    <div v-else>
      <v-card flat>
        <v-card-title class="d-flex align-center pe-2">
          <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
          Registro de Pases

          <v-spacer></v-spacer>

          <v-text-field v-model="search" density="compact" label="Filtrar por Codigo o Nombre"
            prepend-inner-icon="mdi-magnify" variant="solo-filled" flat hide-details single-line></v-text-field>
        </v-card-title>

        <v-divider></v-divider>
        <v-data-table 
        v-model:search="search" 
        :items="paseStore.pases"
        :loading="paseStore.loading"
        :headers="headers">

          <template v-slot:item.status="{ item }">
            <div class="text-start">
              <v-chip :color="item.status ? 'green' : 'red'" :text="item.status ? 'Activo' : 'Inactivo'"
                class="text-uppercase" size="small" label></v-chip>
            </div>
          </template>

          <template v-slot:item.actions="{ item }">
            <div class="d-flex gap-4">
              <!-- <v-btn 
                            icon="mdi-pencil" 
                            size="small" 
                            color="primary" 
                            @click="editar(item)"
                             /> -->

              <v-btn icon="mdi-delete" size="small" color="red" />

              <v-btn icon="mdi-qrcode" size="small" color="black" @click="mostrarQr(item.id)" />
            </div>
          </template>

        </v-data-table>
      </v-card>

    </div>

  </div>

</template>



<style scoped></style>