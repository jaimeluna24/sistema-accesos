<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import { onMounted } from 'vue'
import { useUsuarioStore } from '../../services/usuarios'

const { smAndDown } = useDisplay()
const search = ref('')

const headers = [
  { title: 'Usuario', key: 'nombre_usuario' }, 
  { title: 'Rol', key: 'roles.nombre' },    
  { title: 'Departamento', key: 'departamento.nombre_depto' },
  { title: 'Estado', key: 'activo' },
  { title: 'Acciones', key: 'actions', sortable: false }
]

const store = useUsuarioStore()

onMounted(async () => {
  await store.fetchUsuarios()
})
</script>

<template>
  <div>
    <h1>Gestión de Usuarios</h1>
  </div>

  <div>
    <div v-if="smAndDown">
      <v-list lines="one">
        <v-list-item
          v-for="usuario in store.usuarios"
          :key="usuario.id"
          :title="usuario.nombre_usuario"
          :subtitle="usuario.roles?.nombre"
        />
      </v-list>
    </div>

    <div v-else>
      <v-card flat class="w-3xl">
        <v-card-title class="d-flex align-center pe-2">
          <v-icon icon="mdi-account-group" />
          &nbsp; Lista de Usuarios
          <v-spacer />
          <v-text-field
            v-model="search"
            density="compact"
            label="Buscar usuario"
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
            flat
            hide-details
            single-line
          />
        </v-card-title>

        <v-divider />

        <v-data-table
          v-model:search="search"
          :items="store.usuarios"
          :headers="headers"
          :loading="store.loading"
        >
          <!-- Slot estado activo -->
          <template v-slot:item.activo="{ item }">
            <v-chip
              :color="item.activo ? 'green' : 'red'"
              :text="item.activo ? 'Activo' : 'Inactivo'"
              class="text-uppercase"
              size="small"
              label
            />
          </template>

          <!-- Slot acciones -->
          <template v-slot:item.actions="{ item }">
            <div class="d-flex gap-2">
              <v-btn icon="mdi-pencil" size="small" color="primary" />
              <v-btn icon="mdi-delete" size="small" color="red" />
              <v-btn icon="mdi-qrcode" size="small" color="black" />
            </div>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>