<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'
import { type PaseData } from '../../types/pase'
import { VForm } from 'vuetify/components'
import { usePaseStore } from '../../services/paseService'
import { onMounted } from 'vue'
import QrModal from '../../components/QRModal.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
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
const duracion_unidad = ref('dias')
const dni = ref('')
const paseStore = usePaseStore();

const loading = ref(false)
const errorMsg = ref<string | null>(null)

const snackbar = ref(false)
const text = ref('')
const timeout = ref(4000)
const typeAlert = ref('')
const typeIconAlert = ref('')
const titleAlert = ref('')

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

  try {
    const result = await paseStore.addPase(dataPase)
    if (result!.success) {
      text.value = 'Pase creado exitosamente'
      titleAlert.value = 'Éxito'
      typeAlert.value = 'success'
      typeIconAlert.value = '$success'
      snackbar.value = true
      dialog.value = false
      await paseStore.fetchPases()
    }
  } catch (e: any) {
    console.log('error response:', e.response)
    errorMsg.value = e.response?.data?.message || 'Error al crear el pase'
    text.value = errorMsg.value || 'Error al crear el pase'
    titleAlert.value = 'Error'
    typeAlert.value = 'error'
    typeIconAlert.value = '$error'
    snackbar.value = true
    loading.value = false
  } finally {
    loading.value = false
  }
}

const cancelar = () => {
  if (!form.value) return
  form.value.reset()
  dialog.value = false
}

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
  { title: 'Codigo', key: 'codigo' },
  { title: 'Nombre', key: 'nombre_visitante' },
  { title: 'Apellido', key: 'apellido_visitante' },
  { title: 'Tipo de Pase', key: 'tipo_pase.nombre_pase' },
  { title: 'Estado', key: 'status' },
  {
    title: 'Fecha y Hora',
    key: 'fecha',
    value: (item: any) => formatearFecha(item.created_at)
  },

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

const qrDialog = ref(false)
const paseSeleccionado = ref<string | null>(null)
const codigoSeleccionado = ref<string | null>(null)

function mostrarQr(id: string, codigo: string) {
  paseSeleccionado.value = id
  codigoSeleccionado.value = codigo
  qrDialog.value = true
}

const paginaActual = ref(1)
const porPagina = 10

const totalPaginas = computed(() => Math.ceil(paseStore.pases.length / porPagina))

const pasesPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * porPagina
  return paseStore.pases.slice(inicio, inicio + porPagina)
})
</script>

<template>
  <div class="d-flex justify-space-between p-20">
    <div style="padding: 12px 16px; margin-top: 10px;">
      <!-- <h1 style="font-size: clamp(18px, 4vw, 26px); font-weight: 500; margin: 0 0 4px;">
        Listado de Pases
      </h1>
      <p style="color: grey; margin: 0; font-size: 14px;">
        Historial de pases creados
      </p> -->
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
    <div v-if="smAndDown" style="padding: 8px;">
      <div class="d-flex justify-end align-end" style="margin-bottom: 12px;">
        <v-btn prepend-icon="mdi-qrcode" @click="dialog = true">
          Generar
        </v-btn>
      </div>
      <div v-for="pase in pasesPaginados" :key="pase.id"
        style=" border: 0.5px solid #e0e0e0; border-radius: 12px; padding: 12px 14px; margin-bottom: 10px;">

        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <span style="font-size: 15px; font-weight: 500;">{{ pase.codigo }}</span>
            <p style="font-size: 13px; color: #666; margin: 2px 0 0;">
              {{ pase.nombre_visitante }} {{ pase.apellido_visitante }}
            </p>
          </div>
          <v-chip :color="pase.status ? 'success' : 'default'" size="small" label>
            {{ pase.status ? 'Activo' : 'Inactivo' }}
          </v-chip>
        </div>

        <div style="display: flex; justify-content: space-around; gap: 8px; margin-top: 10px;">
          <v-btn @click="router.push({ name: 'Detalles', params: { id: pase.id } })"
            prepend-icon="mdi-information-slab-box" variant="outlined" color="warning" size="small" flex>Ver
            detalles</v-btn>
          <v-btn prepend-icon="mdi-qrcode" variant="outlined" color="info" size="small" flex
            @click="mostrarQr(pase.id, pase.codigo)">Ver Código QR</v-btn>
        </div>
      </div>

      <v-pagination v-model="paginaActual" :length="totalPaginas" density="compact" />
    </div>
    <div v-else>
      <v-card flat>
        <v-card-title class="d-flex align-center pe-2">
          <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
          Registro de Pases

          <v-spacer></v-spacer>

          <v-text-field v-model="search" density="compact" label="Filtrar por Codigo o Nombre"
            prepend-inner-icon="mdi-magnify" variant="solo-filled" flat hide-details single-line></v-text-field>
          <v-btn prepend-icon="mdi-qrcode" @click="dialog = true" style="margin-left: 16px;" color="primary">
            Generar
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>
        <v-data-table v-model:search="search" :items="paseStore.pases" :loading="paseStore.loading" :headers="headers">

          <template v-slot:item.status="{ item }">
            <div class="text-start">
              <v-chip :color="item.status ? 'green' : 'red'" :text="item.status ? 'Activo' : 'Inactivo'"
                class="text-uppercase" size="small" label></v-chip>
            </div>
          </template>

          <template v-slot:item.actions="{ item }">
            <div class="d-flex gap-4">

              <v-btn style="margin-right: 4px;" icon="mdi-information-slab-box" size="small" color="warning"
                @click="router.push({ name: 'Detalles', params: { id: item.id } })" />
              <v-btn icon="mdi-qrcode" size="small" color="black" @click="mostrarQr(item.id, item.codigo)" />
            </div>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <v-snackbar location="bottom end" :color="typeAlert" :prepended-icon="typeIconAlert" :title="titleAlert"
      v-model="snackbar" :timeout="timeout">
      {{ text }}

      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="snackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>

  </div>
  <QrModal v-model="qrDialog" :pase-id="paseSeleccionado" :codigo="codigoSeleccionado" />

</template>



<style scoped></style>