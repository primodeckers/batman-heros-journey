import { csvParse } from 'd3-dsv'

import type { AIDataCenter } from '@/types/data'
import { parseNullableNumber } from '@/utils/csv'

export async function loadAIDataCenters(): Promise<AIDataCenter[]> {
  const res = await fetch('/data/epoch-ai-data-centers.csv')
  const text = await res.text()

  return csvParse(text, (row) => ({
    name: row['Name'] ?? '',
    country: row['Country'] ?? '',
    owner: row['Owner'] ?? '',
    currentPowerMw: parseNullableNumber(row['Current power (MW)']),
    currentH100Equivalents: parseNullableNumber(row['Current H100 equivalents']),
    currentCapitalCostBillions: parseNullableNumber(
      row['Current total capital cost (2025 USD billions)'],
    ),
  }))
}

/** Nº de data centers por país, ordenado do maior pro menor — pro mapa/ranking. */
export function countDataCentersByCountry(dataCenters: AIDataCenter[]) {
  const counts = new Map<string, number>()
  for (const dc of dataCenters) {
    if (!dc.country) continue
    counts.set(dc.country, (counts.get(dc.country) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
}
