<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'
import { VForm } from 'vuetify/components'
import { onMounted } from 'vue'
import { type UsuarioData } from '../../types/usuario'
import { useUsuarioStore } from '../../services/usuarios'
import { useRolStore } from '../../services/rolService'
import { useDepartamentoStore } from '../../services/departamentoService'


const form = ref<InstanceType<typeof VForm> | null>(null)

const { smAndDown } = useDisplay()
const search = ref('')
const dialog = ref(false)
const visible = ref(false)

const nombre_usuario = ref('')
const contrasenia = ref('')
const rol_id = ref(null)
const depto_id = ref(null)

const usuarioStore = useUsuarioStore();
const rolStore = useRolStore();
const departamentoStore = useDepartamentoStore();


const loading = ref(false)
const errorMsg = ref<string | null>(null)

const snackbar = ref(false)
const text = ref('')
const timeout = ref(4000)
const typeAlert = ref('')
const typeIconAlert = ref('')
const titleAlert = ref('')


onMounted(async () => {
  await usuarioStore.fetchUsuarios()
  await rolStore.fetchRoles()
  await departamentoStore.fetchDepartamentos()
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

const crearUsuario = async () => {
  if (!form.value) return

  const { valid } = await form.value.validate()
  if (!valid) return

  errorMsg.value = null
  loading.value = true

  const dataUsuario: UsuarioData = {
    nombre_usuario: nombre_usuario.value,
    contrasenia: contrasenia.value,
    rol_id: rol_id.value!,
    depto_id: depto_id.value!,
  }

  try {
    const result = await usuarioStore.addUsuario(dataUsuario)
    if (result!.success) {
      text.value = 'Usuario creado exitosamente'
      titleAlert.value = 'Éxito'
      typeAlert.value = 'success'
      typeIconAlert.value = '$success'
      snackbar.value = true
      dialog.value = false
      await usuarioStore.fetchUsuarios()
    }

  } catch (e: any) {
    titleAlert.value = 'Error'
    typeAlert.value = 'error'
    typeIconAlert.value = '$error'
    text.value = e.response?.data?.message || 'Error al crear el usuario'
    console.log('error response:', e.response)
    errorMsg.value = e.response?.data?.message || 'Error al crear el usuario'
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
  { title: 'Usuario', key: 'nombre_usuario' },
  { title: 'Rol', key: 'roles.nombre' },
  { title: 'Departamento', key: 'departamento.nombre_depto' },
  { title: 'Estado', key: 'status' },
  {
    title: 'Fecha y Hora',
    key: 'fecha',
    value: (item: any) => formatearFecha(item.created_at)
  },
  { title: 'Acciones', key: 'actions', sortable: false }
]

const paginaActual = ref(1)
const porPagina = 10

const totalPaginas = computed(() => Math.ceil(usuarioStore.usuarios.length / porPagina))

const usuariosPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * porPagina
  return usuarioStore.usuarios.slice(inicio, inicio + porPagina)
})
</script>

<template>
  <div class="d-flex justify-space-between p-20">
    <div style="padding: 12px 16px; margin-top: 15px;">
      <h1 style="font-size: clamp(18px, 4vw, 26px); font-weight: 500; margin: 0 0 4px;">
        Gestión de Usuario
      </h1>
      <p style="color: grey; margin: 0; font-size: 14px;">
        Listado de usuarios creados
      </p>
    </div>
    <div class="d-flex justify-center align-center">
      <v-btn prepend-icon="mdi-qrcode" @click="dialog = true">
        Crear
      </v-btn>
    </div>
    <v-dialog v-model="dialog" max-width="600" persistent>
      <v-card prepend-icon="mdi-qrcode" title="Generar Pase">
        <v-form ref="form">
          <v-card-text>
            <v-row density="comfortable">
              <v-col cols="12" md="6" sm="6">
                <v-text-field :rules="[v => !!v || 'El nombre de usaurio es requerido']" v-model="nombre_usuario"
                  label="Nombre de Usaurio*" variant="outlined" />
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-text-field :rules="[v => !!v || 'La contraseña es requerida']" v-model="contrasenia"
                  :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                  prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
                  label="Contraseña*" />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-select :rules="[v => !!v || 'Seleccione un Rol']" v-model="rol_id" :items="rolStore.roles"
                  placeholder="Seleccionar..." item-title="nombre" item-value="id" label="Rol*" variant="outlined" />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-select :rules="[v => !!v || 'Seleccione un Departamento']" v-model="depto_id"
                  :items="departamentoStore.departamentos" placeholder="Seleccionar..." item-title="nombre_depto"
                  item-value="id" label="Departamento*" variant="outlined" />
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn text="Cancelar" variant="plain" @click="cancelar" />
            <v-btn color="primary" text="Guardar" variant="tonal" :loading="loading" @click="crearUsuario" />
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
  <div>
    <div v-if="smAndDown" style="padding: 8px;">
      <div v-for="usuarios in usuariosPaginados" :key="usuarios.id"
        style=" border: 0.5px solid #e0e0e0; border-radius: 12px; padding: 12px 14px; margin-bottom: 10px;">

        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <span style="font-size: 15px; font-weight: 500;">{{ usuarios.nombre_usuario }}</span>
            <p style="font-size: 13px; color: #666; margin: 2px 0 0;">
              {{ usuarios.roles.nombre }} {{ usuarios.departamento.nombre_depto }}
            </p>
          </div>
          <v-chip :color="usuarios.activo ? 'success' : 'default'" size="small" label>
            {{ usuarios.activo ? 'Activo' : 'Inactivo' }}
          </v-chip>
        </div>

        <div style="display: flex; justify-content: space-around; gap: 8px; margin-top: 10px;">
          <v-btn prepend-icon="mdi-information-slab-box" variant="outlined" color="warning" size="small" flex>Ver
            detalles</v-btn>
          <!-- <v-btn prepend-icon="mdi-qrcode" variant="outlined" color="info" size="small" flex @click="mostrarQr(pase.id, pase.codigo)">Ver Código QR</v-btn> -->
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
        </v-card-title>

        <v-divider></v-divider>
        <v-data-table v-model:search="search" :items="usuarioStore.usuarios" :loading="usuarioStore.loading"
          :headers="headers">

          <template v-slot:item.status="{ item }">
            <div class="text-start">
              <v-chip :color="item.activo ? 'green' : 'red'" :text="item.activo ? 'Activo' : 'Inactivo'"
                class="text-uppercase" size="small" label></v-chip>
            </div>
          </template>

          <template v-slot:item.actions="{ item }">
            <div class="d-flex gap-4">
              <v-btn prepend-icon="mdi-information-slab-box" variant="outlined" color="warning" size="small" flex>Ver
                detalles</v-btn>
            </div>
          </template>

        </v-data-table>
      </v-card>

    </div>
    <v-snackbar location="bottom end" :color="typeAlert" :prepended-icon="typeIconAlert" :title="titleAlert" v-model="snackbar"
      :timeout="timeout">
      {{ text }}

      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="snackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>

  </div>

</template>



<style scoped></style>