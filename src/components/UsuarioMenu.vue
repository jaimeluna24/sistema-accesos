<template>
    <v-menu min-width="200px">
        <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" class="mr-2">
                <v-avatar color="brown" size="">
                    <v-icon icon="mdi-account-circle"></v-icon>
                </v-avatar>
            </v-btn>
        </template>
        <v-card>
            <v-card-text>
                <div class="mx-auto text-center">
                    <v-avatar color="brown">
                        <v-icon icon="mdi-account-circle"></v-icon>
                    </v-avatar>
                    <h3 class="my-0" style="text-transform: uppercase;">{{ usuario.nombre_usuario }}</h3>
                    <p class="text-body-small mt-1" style="text-transform: uppercase;">{{ usuario.departamento }}; {{ usuario.rol }}</p>
                    <p class="text-body-small mt-1" style="text-transform: uppercase;"></p>
                    <v-divider class="my-3"></v-divider>
                    <v-btn variant="text" rounded @click="logout()">Cerrar Sesión</v-btn>
                </div>
            </v-card-text>
        </v-card>
    </v-menu>
</template>
<script setup>

import { useAuthStore } from '../services/authService'

const auth = useAuthStore()

function logout() {
    auth.logout()
}

const usuario = JSON.parse(localStorage.getItem('user') || '{}')

const user = {
    initials: 'JD',
    fullName: 'John Doe',
    email: 'john.doe@doe.com',
}
</script>