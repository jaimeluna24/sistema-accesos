<template>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" :style="myStyles" />
</template>

<script lang="ts">
import { Bar } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
    name: "BarChart",
    components: { Bar },
    computed: {
        myStyles() {
            return {
                height: "80px",
                position: "relative",
            };
        },
    },
    data() {
        return {
            chartData: {
                labels: [
                    "Lunes",
                    "Martes",
                    "Miercoles",
                    "Jueves",
                    "Viernes",
                    "Sabado",
                    "Domingo",
                ],
                datasets: [{ backgroundColor: "#f87979", data: [40, 20, 12] }],
            },
            chartOptions: {
                responsive: true,
            },
        };
    },
};
</script>
