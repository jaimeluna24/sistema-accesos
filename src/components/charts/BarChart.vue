<template>
    <div style="width: 100%; height: 300px;"> <!-- ← controla la altura aquí -->
        <Bar :key="isDark ? 'dark' : 'light'" id="my-chart-id" :options="chartOptions" :data="chartData"
            style="width: 100%; height: 100%;" />
    </div>
</template>

<script lang="ts">
import { Bar } from "vue-chartjs";
import { useTheme } from "vuetify";
import { computed, onMounted } from "vue";
import { useStatsStore } from "../../services/dashboardService";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";
import { toBarChartData } from './BarChart'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
    name: "BarChart",
    components: { Bar },
    setup() {
        const theme = useTheme();
        const isDark = computed(() => theme.global.current.value.dark);
        const statsStore = useStatsStore();

        onMounted(async () => {
            await statsStore.fetchDataStats()
        })

        const textColor = computed(() => isDark.value ? '#E5E7EB' : '#1a1b1e');
        const gridColor = computed(() => isDark.value ? '#374151' : '#E5E7EB');

        const myStyles = computed(() => ({
            height: "200px",
            position: "relative",
        }));

        const chartData = computed(() => toBarChartData(statsStore.dailyData));

        const chartOptions = computed(() => ({
            responsive: false,
            plugins: {
                legend: {
                    position: "top" as const,
                    title: {
                        display: true,
                        text: "Entradas y Salidas Por Día",
                        color: textColor.value,
                        font: { size: 17 },
                        padding: { top: 10 },
                    },
                    labels: {
                        color: textColor.value,
                        padding: 20,
                        boxWidth: 14,
                        boxHeight: 14,
                        usePointStyle: true,
                        pointStyle: "circle",
                    },
                },
                tooltip: {
                    backgroundColor: isDark.value ? '#1F2937' : '#FFFFFF',
                    titleColor: isDark.value ? '#F9FAFB' : '#111827',
                    bodyColor: isDark.value ? '#D1D5DB' : '#374151',
                    borderColor: isDark.value ? '#374151' : '#E5E7EB',
                    borderWidth: 1,
                },
            },
            scales: {
                x: {
                    ticks: { color: textColor.value },
                    grid: { color: gridColor.value },
                },
                y: {
                    ticks: { color: textColor.value },
                    grid: { color: gridColor.value },
                },
            },
        }));

        return { myStyles, chartData, chartOptions, isDark };
    },
};
</script>