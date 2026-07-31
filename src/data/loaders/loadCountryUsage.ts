import { csvParse } from 'd3-dsv'

import type { CountryUsageRow } from '@/types/data'

/** Uso do Claude por país, top 15 (public/data/anthropic-claude-usage-by-country.csv). */
export async function loadCountryUsage(): Promise<CountryUsageRow[]> {
  const res = await fetch('/data/anthropic-claude-usage-by-country.csv')
  const text = await res.text()

  return csvParse(text, (row) => ({
    rank: Number(row['rank']),
    country: row['country'] ?? '',
    usagePerCapitaIndex: Number(row['usage_per_capita_index']),
  }))
}
