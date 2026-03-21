<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay()
const search = ref('')

const headers = [
    { title: 'Codigo', key: 'codigo' },
    { title: 'Nombre', key: 'nombre_visitante' },
    { title: 'Apellido', key: 'apellido_visitante' },
    { title: 'Tipo de Pase', key: 'tipo_pase' },
    { title: 'Estado', key: 'status' },
    { title: 'Fecha de Creación', key: 'created_at' },

    // columna que NO existe en los datos
    { title: 'Acciones', key: 'actions', sortable: false }
]
const items = [
    {
        codigo: 'PS-INV-0001',
        nombre_visitante: 'Jaime David',
        apellido_visitante: 'Luna Ponce',
        telefono: '8846-1192',
        tipo_pase: 'Visitante',
        status: false,
        created_at: "24/12/2026 06:56:58",
    },
    {
        codigo: 'PS-INV-0002',
        nombre_visitante: 'Wescol',
        apellido_visitante: 'Aguilera',
        telefono: '8846-1192',
        tipo_pase: 'Visitante',
        status: true,
        created_at: "24/12/2026 06:56:58",
    },


]

console.log(smAndDown)
</script>

<template>
    <div>
        <h1>Generar Pase</h1>
        <p>Bienvenido al sistema</p>
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
                        prepend-inner-icon="mdi-magnify" variant="solo-filled" flat hide-details
                        single-line></v-text-field>
                </v-card-title>

                <v-divider></v-divider>
                <v-data-table v-model:search="search" :filter-keys="['codigo', 'nombre_visitante']" :items="items"
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

                            <v-btn icon="mdi-delete" size="small" color="red"/>

                            <v-btn icon="mdi-qrcode" size="small" color="black" />
                        </div>
                    </template>

                </v-data-table>
            </v-card>

        </div>

    </div>

</template>



<style scoped></style>