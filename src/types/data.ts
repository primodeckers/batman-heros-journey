// Tipos de dados do dashboard — Tema E: pegada ambiental da IA.

export type DataSource = {
  name: string
  url: string
  accessedAt: string
}

/** Um data center de IA (public/data/epoch-ai-data-centers.csv) */
export type AIDataCenter = {
  name: string
  country: string
  owner: string
  currentPowerMw: number | null
  currentH100Equivalents: number | null
  currentCapitalCostBillions: number | null
}

/** Um marco na construção de um data center (public/data/epoch-ai-data-center-timelines.csv) */
export type AIDataCenterTimelineEntry = {
  dataCenter: string
  date: Date
  powerMw: number | null
  h100Equivalents: number | null
  waterUseMgd: number | null
}

/** Demanda elétrica de um país num ano (public/data/owid-electricity-demand-by-country.csv) */
export type CountryElectricityDemand = {
  country: string
  isoCode: string
  year: number
  electricityDemandTwh: number
}

/** Uma estimativa citada no relatório da IEA/Carbon Brief (public/data/iea-ai-energy-estimates.csv) */
export type IEAEstimate = {
  metric: string
  year: number
  valueLow: number
  valueHigh: number
  unit: string
  source: string
  note: string
}
