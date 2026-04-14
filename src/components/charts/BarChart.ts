import type { ChartData } from 'chart.js'

export interface DailyData {
  label: string
  entradas: number
  salidas: number
}

// Datos simulados (vendrá de tu API después)
export const rawDailyData: DailyData[] = [
  { label: 'Lunes',     entradas: 40, salidas: 40 },
  { label: 'Martes',    entradas: 20, salidas: 20 },
  { label: 'Miercoles', entradas: 12, salidas: 12 },
  { label: 'Jueves',    entradas: 30, salidas: 25 },
  { label: 'Viernes',   entradas: 50, salidas: 35 },
  { label: 'Sabado',    entradas: 15, salidas: 10 },
  { label: 'Domingo',   entradas: 5,  salidas: 3  },
]

// Función que convierte tu data al formato de Chart.js
export function toBarChartData(items: DailyData[]): ChartData<'bar'> {
  return {
    labels: items.map(i => i.label),
    datasets: [
      {
        label: 'Entradas',
        data: items.map(i => i.entradas),
        backgroundColor: '#0a873f',
      },
      {
        label: 'Salidas',
        data: items.map(i => i.salidas),
        backgroundColor: '#FF5252',
      },
    ],
  }
}