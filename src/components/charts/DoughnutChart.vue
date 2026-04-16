<template>
    <Doughnut 
        :key="isDark ? 'dark' : 'light'"
        id="my-donchart-id" 
        :data="chartData" 
        :options="chartOptions" 
        style="margin-bottom: 70px;"
    />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { toChartData } from './DoughnutChart'
import { useStatsStore } from '../../services/dashboardService'

ChartJS.register(ArcElement, Tooltip, Legend)

const statsStore = useStatsStore()
const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)

const textColor = computed(() => isDark.value ? '#E5E7EB' : '#1a1b1e')

const chartData = computed(() => toChartData(statsStore.accessData))

const chartOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            position: 'top' as const,
            title: {
                display: true,
                text: 'Entradas y Salidas de Semana',
                color: textColor.value,
                font: { size: 17 },
                padding: { top: 10 }
            },
            labels: {
                color: textColor.value,
                padding: 20,
                boxWidth: 14,
                boxHeight: 14,
                usePointStyle: true,
                pointStyle: 'circle'
            }
        },
        tooltip: {
            backgroundColor: isDark.value ? '#1F2937' : '#FFFFFF',
            titleColor: isDark.value ? '#F9FAFB' : '#111827',
            bodyColor: isDark.value ? '#D1D5DB' : '#374151',
            borderColor: isDark.value ? '#374151' : '#E5E7EB',
            borderWidth: 1,
        },
    }
}))
</script>