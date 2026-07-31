import { csvParse } from 'd3-dsv'

import type { CountryUsageRow } from '@/types/data'

/** Uso do Claude por país (public/data/anthropic-claude-usage-by-country.csv). */
export async function loadCountryUsage(): Promise<CountryUsageRow[]> {
  const res = await fetch('/data/anthropic-claude-usage-by-country.csv')
  const text = await res.text()

  return csvParse(text, (row) => ({
    iso3: row['iso3'] ?? '',
    country: row['country'] ?? '',
    usageCount: Number(row['usage_count']),
    usagePct: Number(row['usage_pct']),
    usagePerCapitaIndex: Number(row['usage_per_capita_index']),
    gdpPerWorkingAgeCapita: Number(row['gdp_per_working_age_capita']),
  }))
}
