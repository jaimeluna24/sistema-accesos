<script setup>
// import Sidebar from "../components/Sidebar.vue"
import Navbar from "../components/Navbar.vue"
import ButtomNavigation from "../components/ButtomNavigation.vue"
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay()

</script>

<template>
  <v-app>
    <div class="layout">
        <div class="content">
          <Navbar />
          <main class="page">
            <router-view />
          </main>
        </div>

      <div v-if="smAndDown">
        <ButtomNavigation />
      </div>
    </div>
  </v-app>
</template>

<style>
.layout {
  display: flex;
}

.content {
  flex: 1;
  margin-top: 27px;
  margin-bottom: 37px;
}

.page {
  padding: 20px;
}
</style>