<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { ref } from 'vue'
import BarChart from '../../components/charts/BarChart.vue';
import DoughnutChart from '../../components/charts/DoughnutChart.vue';
import { Doughnut } from 'vue-chartjs';
const { smAndDown } = useDisplay()

  const color = ref('primary')

</script>

<template>
  <div class="d-flex justify-space-between p-20">
    <div style="padding: 12px 16px; margin-top: 15px;">
      <h1 style="font-size: clamp(18px, 4vw, 26px); font-weight: 500; margin: 0 0 4px;">
        Dashboard
      </h1>
    </div>
  </div>
  <div>
    <div v-if="smAndDown" style="padding: 8px;">
      

    </div>
    <div v-else>
     <v-row class="justify-center">

    <v-col
      cols="12"
      md="3"
    >
      <v-card
        :color="color"
        variant="outlined"
        class="mx-auto"
      >
        <v-card-item>
          <div>
            <div class="text-label-medium text-uppercase mt-2 mb-3">
              Pases Totales
            </div>
            <div class="text-title-large mb-1">
              96
            </div>
            <div class="text-body-small">Greyhound divisely hello coldly fonwderfully</div>
          </div>
        </v-card-item>
      </v-card>
    </v-col>

    <v-col
      cols="12"
      md="3"
    >
      <v-card
        :color="color"
        variant="outlined"
        class="mx-auto"
      >
        <v-card-item>
          <div>
            <div class="text-label-medium text-uppercase mt-2 mb-3">
              Registros de pases totales
            </div>
            <div class="text-title-large mb-1">
              398
            </div>
            <div class="text-body-small">Greyhound divisely hello coldly fonwderfully</div>
          </div>
        </v-card-item>
      </v-card>
    </v-col>

    <v-col
      cols="12"
      md="3"
    >
      <v-card
        :color="color"
        variant="outlined"
        class="mx-auto"
      >
        <v-card-item>
          <div>
            <div class="text-label-medium text-uppercase mt-2 mb-3">
              Cantidad de Entradas
            </div>
            <div class="text-title-large mb-1">
              234
            </div>
            <div class="text-body-small">Greyhound divisely hello coldly fonwderfully</div>
          </div>
        </v-card-item>
      </v-card>
    </v-col>


    <v-col
      cols="12"
      md="3"
    >
      <v-card
        :color="color"
        variant="outlined"
        class="mx-auto"
      >
        <v-card-item>
          <div>
            <div class="text-label-medium text-uppercase mt-2 mb-3">
              Cantidad de Salidas
            </div>
            <div class="text-title-large mb-1">
              129
            </div>
            <div class="text-body-small">Greyhound divisely hello coldly fonwderfully</div>
          </div>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
    </div>
    <div style="padding: 8px; max-height: 350px; display: flex; justify-content: space-around;">
      <!-- <div > -->
      <BarChart />      
      <!-- </div> -->
      <div>
      <DoughnutChart />
      
      </div>
      
    </div>
  </div>
</template>
<style scoped></style>