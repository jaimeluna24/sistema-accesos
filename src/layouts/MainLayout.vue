<script setup>
// import Sidebar from "../components/Sidebar.vue"
import Navbar from "../components/Navbar.vue"
import ButtomNavigation from "../components/ButtomNavigation.vue"

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

    <ButtomNavigation />

  </div>
  </v-app>
</template>

<style>
.layout{
  display:flex;
}

.content{
  flex:1;
  margin-top: 25px;
}

.page{
  padding:20px;
}
</style>