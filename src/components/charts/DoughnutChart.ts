import type { ChartData } from 'chart.js'

// Tipo que replica la forma de tu respuesta de API
export interface AccessData {
  label: string
  count: number
  color: string
}

// Datos simulados (esto vendrá de tu API después)
export const rawAccessData: AccessData[] = [
  { label: 'Entradas', count: 120, color: '#0a873f' },
  { label: 'Salidas',    count: 45,  color: '#FF5252' },
]

// Función que convierte tu data cruda al formato de Chart.js
export function toChartData(items: AccessData[]): ChartData<'doughnut'> {
  return {
    labels: items.map(i => i.label),
    datasets: [{
      data: items.map(i => i.count),
      backgroundColor: items.map(i => i.color),
      borderWidth: 0,
      hoverOffset: 8,
    }]
  }
}