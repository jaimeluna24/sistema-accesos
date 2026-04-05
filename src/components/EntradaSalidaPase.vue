<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useUbicacionStore } from '../services/ubicacionService';
import { VForm } from 'vuetify/components'
import { type DataRegistro } from '../types/registros'
import { useRegistroStore } from '../services/registrosService';
import { useRouter } from 'vue-router'

const router = useRouter()
// import QRCode from 'qrcode'

const props = defineProps<{
  paseId: string | null
  tipo: string | null
  usuarioId: number | null
  codigo: string | null
  modelValue: boolean
}>()

const form = ref<InstanceType<typeof VForm> | null>(null)
const loading = ref(false)
const errorMsg = ref<string | null>(null)

const usuario = JSON.parse(localStorage.getItem('user') || '{}')
const creado_por = ref(usuario.id ? parseInt(usuario.id) : 0)
const location_id = ref(null)
const registroStore = useRegistroStore();

const ubicacionStore = useUbicacionStore()
onMounted(async () => {
  await ubicacionStore.fetchUbicaciones();
})


const snackbar = ref(false)
const text = ref('')
const timeout = ref(4000)

const emit = defineEmits(['update:modelValue', 'update:location_id'])

const cerrarModal = () => {
  emit('update:modelValue', false)
  emit('update:location_id', null)
  if (!form.value) return
  form.value.reset()
  loading.value = false
  window.setTimeout(() => {
    snackbar.value = false
    router.push({ name: 'EscanearPase' })
  }, 2000)
  
}


const generarRegistro = async () => {
  if (!form.value) return

  const { valid } = await form.value.validate()
  if (!valid) return

  errorMsg.value = null
  loading.value = true

  const dataRegistro: DataRegistro = {
    id_pase: props.paseId!,
    tipo: props.tipo!,
    usuario_id: creado_por.value,
    locacion_id: location_id.value
  }

  try {
    const result = await registroStore.addRegistros(dataRegistro)
    if (result!.success) {
      text.value = 'Registro creado exitosamente'
      snackbar.value = true
      cerrarModal()
    }
  } catch (e: any) {
    console.log('error response:', e.response)
    errorMsg.value = e.response?.data?.message || 'Error al crear el pase'
  } finally {
    loading.value = false
  }
}



</script>

<template>
  <v-dialog :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)" max-width="400"
    persistent>
    <v-card class="pa-6 text-center">
      <v-card-title style="margin-bottom: 0px;" class="mb-4">Registrar {{ tipo }} </v-card-title>
      <v-card-subtitle>{{ codigo }}</v-card-subtitle>
      <v-form ref="form">
        <v-col cols="12" md="4" sm="6" style="padding-top: 10px;">
          <v-select :rules="[v => !!v || 'Seleccione un tipo']" v-model="location_id"
            :items="ubicacionStore.ubicaciones" placeholder="Seleccionar..." item-title="nombre_location"
            item-value="id" label="Ubicación*" variant="outlined" />
        </v-col>
        <v-card-actions class="justify-center mt-4">

          <v-btn @click="cerrarModal()" color="error" variant="tonal">
            Cerrar
          </v-btn>
          <v-btn color="success" :loading="loading" @click="generarRegistro">
            Registrar
          </v-btn>
        </v-card-actions>
      </v-form>

    </v-card>
  </v-dialog>

  <v-snackbar location="bottom end" color="success" prepended-icon="$success" title="Exito" v-model="snackbar"
    :timeout="timeout">
    {{ text }}

    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
