<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { onMounted, ref } from 'vue'
import BarChart from '../../components/charts/BarChart.vue';
import DoughnutChart from '../../components/charts/DoughnutChart.vue';
import { useStatsStore } from '../../services/dashboardService'
const { smAndDown } = useDisplay()

const colorPrincipal = ref('#FB8C00')
const colorSecundario = ref('#1976D2')
const colorTercero = ref('#0a873f')
const colorCuarto = ref('#FF5252')

const statsStore = useStatsStore()

onMounted(() => {
  statsStore.fetchPasesStats()
  statsStore.fetchRegistrosStats()
})



</script>

<template>
  <div class="d-flex justify-space-between p-20">
    <div style="padding: 12px 16px; margin-top: 15px;">
      <!-- <h1 style="font-size: clamp(18px, 4vw, 26px); font-weight: 500; margin: 0 0 4px;">
        Dashboard
      </h1> -->
    </div>
  </div>
  <div>
    <div v-if="smAndDown" style="padding: 8px;">
      <v-row class="justify-center" >

        <v-col cols="12" md="3">
          <v-card :color="colorPrincipal" class="mx-auto">
            <v-card-item>
              <div>
                <div class="text-label-medium text-uppercase mt-2 mb-3">
                  Pases Totales
                </div>
                <div class="text-title-large mb-1">
                  {{ statsStore.pasesStats?.totalPases || 0 }}
                </div>
                <div class="text-body-small">Greyhound divisely hello coldly fonwderfully</div>
              </div>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card :color="colorSecundario" class="mx-auto">
            <v-card-item>
              <div>
                <div class="text-label-medium text-uppercase mt-2 mb-3">
                  Registros de pases totales
                </div>
                <div class="text-title-large mb-1">
                  {{ statsStore.registrosStats?.totalRegistros || 0 }}
                </div>
                <div class="text-body-small">Greyhound divisely hello coldly fonwderfully</div>
              </div>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card :color="colorTercero" class="mx-auto">
            <v-card-item>
              <div>
                <div class="text-label-medium text-uppercase mt-2 mb-3">
                  Cantidad de Entradas
                </div>
                <div class="text-title-large mb-1">
                  {{ statsStore.registrosStats?.registrosEntrada || 0 }}
                </div>
                <div class="text-body-small">Greyhound divisely hello coldly fonwderfully</div>
              </div>
            </v-card-item>
          </v-card>
        </v-col>


        <v-col cols="12" md="3">
          <v-card :color="colorCuarto" class="mx-auto">
            <v-card-item>
              <div>
                <div class="text-label-medium text-uppercase mt-2 mb-3">
                  Cantidad de Salidas
                </div>
                <div class="text-title-large mb-1">
                  {{ statsStore.registrosStats?.registrosSalida || 0 }}
                </div>
                <div class="text-body-small">Greyhound divisely hello coldly fonwderfully</div>
              </div>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
      <div class="charts-container">
        <div>
          <BarChart />

        </div>

        <div>
          <DoughnutChart />
        </div>
      </div>

    </div>
    <div v-else>
      <v-row class="justify-center">

        <v-col cols="12" md="3">
          <v-card :color="colorPrincipal" class="mx-auto">
            <v-card-item>
              <div>
                <div class="text-label-medium text-uppercase mt-2 mb-3">
                  Pases Totales
                </div>
                <div class="text-title-large mb-1">
                  {{ statsStore.pasesStats?.totalPases || 0 }}
                </div>
                <div class="text-body-small">Greyhound divisely hello coldly fonwderfully</div>
              </div>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card :color="colorSecundario" class="mx-auto">
            <v-card-item>
              <div>
                <div class="text-label-medium text-uppercase mt-2 mb-3">
                  Registros de pases totales
                </div>
                <div class="text-title-large mb-1">
                  {{ statsStore.registrosStats?.totalRegistros || 0 }}
                  
                </div>
                <div class="text-body-small">Greyhound divisely hello coldly fonwderfully</div>
              </div>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card :color="colorTercero" class="mx-auto">
            <v-card-item>
              <div>
                <div class="text-label-medium text-uppercase mt-2 mb-3">
                  Cantidad de Entradas
                </div>
                <div class="text-title-large mb-1">
                    {{ statsStore.registrosStats?.registrosEntrada || 0 }}

                </div>
                <div class="text-body-small">Greyhound divisely hello coldly fonwderfully</div>
              </div>
            </v-card-item>
          </v-card>
        </v-col>


        <v-col cols="12" md="3">
          <v-card :color="colorCuarto" class="mx-auto">
            <v-card-item>
              <div>
                <div class="text-label-medium text-uppercase mt-2 mb-3">
                  Cantidad de Salidas
                </div>
                <div class="text-title-large mb-1">
                  {{ statsStore.registrosStats?.registrosSalida || 0 }}
                </div>
                <div class="text-body-small">Greyhound divisely hello coldly fonwderfully</div>
              </div>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
      <div class="charts-container">
        <BarChart />

        <div>
          <DoughnutChart />
        </div>
      </div>


    </div>

  </div>
</template>
<style scoped>
.charts-container {
  padding: 8px;
  padding-top: 20px;
  max-height: 350px;
  display: flex;
  justify-content: space-around;
  gap: 40px;
}

/* Cuando la pantalla sea móvil */
@media (max-width: 768px) {
  .charts-container {
    flex-direction: column;
    max-height: none;
    max-height: 350px;

  }
}
</style>