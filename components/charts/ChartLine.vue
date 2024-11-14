<template>
  <Line
    :options="{
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      scales: {
        x: {
          ticks: {
            stepSize: 1,
          },
        },
      },
    }"
    :data="{
      labels: labels,
      datasets: datasets,
    }"
  />
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const props = defineProps<{
  labels: string[];
  data: ChartData[];
}>();

const datasets = computed(() => {
  return props.data.map(item => ({
    label: item.name,
    data: item.data,
    borderColor: item.color,
    fill: false,
  })) ?? [];
});
</script>
