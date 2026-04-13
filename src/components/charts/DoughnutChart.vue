<template>
    <Doughnut id="my-donchart-id" :data="chartData" :options="chartOptions"  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { rawAccessData, toChartData } from './DoughnutChart'

ChartJS.register(ArcElement, Tooltip, Legend)

const chartData = computed(() => toChartData(rawAccessData))

const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
    legend: {
        title: {
        display: true,
        text: 'Frameworks',
        color: '#6B7280',
        font: { size: 12 },
        padding: { top: 20 }
      },
        position: 'bottom' as const,
      labels: {
        padding: 20,        
        boxWidth: 14,       
        boxHeight: 14,   
        usePointStyle: true, 
        pointStyle: 'circle'  
      }

    }
}
}
</script>