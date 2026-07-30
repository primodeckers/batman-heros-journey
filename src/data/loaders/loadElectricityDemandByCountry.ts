import { csvParse } from 'd3-dsv'

import type { CountryElectricityDemand } from '@/types/data'

export async function loadElectricityDemandByCountry(): Promise<CountryElectricityDemand[]> {
  const res = await fetch('/data/owid-electricity-demand-by-country.csv')
  const text = await res.text()

  return csvParse(text, (row) => ({
    country: row['country'] ?? '',
    isoCode: row['iso_code'] ?? '',
    year: Number(row['year']),
    electricityDemandTwh: Number(row['electricity_demand_twh']),
  }))
}

/** Ano mais recente disponível por país — pra comparação "equivale a X países". */
export function getLatestDemandPerCountry(rows: CountryElectricityDemand[]) {
  const latest = new Map<string, CountryElectricityDemand>()
  for (const row of rows) {
    const current = latest.get(row.country)
    if (!current || row.year > current.year) {
      latest.set(row.country, row)
    }
  }
  return [...latest.values()].sort((a, b) => b.electricityDemandTwh - a.electricityDemandTwh)
}
