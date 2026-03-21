<script setup>

</script>

<template>
    <v-app-bar :elevation="5">
      <!-- Botón de menú a la izquierda -->
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <!-- Título -->
      <v-app-bar-title>Application Bar</v-app-bar-title>

      <!-- Botones a la derecha -->
      <template v-slot:append>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
    </v-app-bar>
</template>


<style scoped>

</style>