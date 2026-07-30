import { csvParse } from 'd3-dsv'

import type { IEAEstimate } from '@/types/data'

export async function loadIEAEstimates(): Promise<IEAEstimate[]> {
  const res = await fetch('/data/iea-ai-energy-estimates.csv')
  const text = await res.text()

  return csvParse(text, (row) => ({
    metric: row['metric'] ?? '',
    year: Number(row['year']),
    valueLow: Number(row['value_low']),
    valueHigh: Number(row['value_high']),
    unit: row['unit'] ?? '',
    source: row['source'] ?? '',
    note: row['note'] ?? '',
  }))
}

/** Filtra as estimativas por métrica (ver public/data/iea-ai-energy-estimates.csv). */
export function getEstimatesByMetric(estimates: IEAEstimate[], metric: string) {
  return estimates.filter((e) => e.metric === metric).sort((a, b) => a.year - b.year)
}
