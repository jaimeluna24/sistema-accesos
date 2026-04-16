export interface PasesData {
    totalPases: number
    pasesActivos: number
    pasesVencidos: number
}

export interface RegistrosData {
    totalRegistros: number
    registrosEntrada: number
    registrosSalida: number
}

// interfaces
export interface AccessData {
  label: string
  count: number
  color: string
}
export interface DailyData {
  label: string
  entradas: number
  salidas: number
}
export interface StatsData {
  dailyData: DailyData[]   
  accessData: AccessData[] 
}