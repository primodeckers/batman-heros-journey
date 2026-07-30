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

export type CountryDataCenterAggregate = {
  country: string
  count: number
  totalPowerMw: number
}

/** Agrega nº de data centers e potência total por país, ordenado do maior pro menor. */
export function aggregateDataCentersByCountry(
  dataCenters: AIDataCenter[],
): CountryDataCenterAggregate[] {
  const byCountry = new Map<string, CountryDataCenterAggregate>()
  for (const dc of dataCenters) {
    if (!dc.country) continue
    const current = byCountry.get(dc.country) ?? {
      country: dc.country,
      count: 0,
      totalPowerMw: 0,
    }
    current.count += 1
    current.totalPowerMw += dc.currentPowerMw ?? 0
    byCountry.set(dc.country, current)
  }
  return [...byCountry.values()].sort((a, b) => b.totalPowerMw - a.totalPowerMw)
}
