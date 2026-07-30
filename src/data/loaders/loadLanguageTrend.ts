import { csvParse } from 'd3-dsv'

import type { LanguageTrendPoint } from '@/types/data'

/** Nº de desenvolvedores que fizeram push por linguagem/trimestre no GitHub (public/data/github-language-trend.csv). */
export async function loadLanguageTrend(): Promise<LanguageTrendPoint[]> {
  const res = await fetch('/data/github-language-trend.csv')
  const text = await res.text()

  return csvParse(text, (row) => ({
    year: Number(row['year']),
    quarter: Number(row['quarter']),
    language: row['language'] ?? '',
    numPushers: Number(row['num_pushers']),
  }))
}

/** Ordena por ano+trimestre, útil pra desenhar a linha do tempo. */
export function sortByQuarter(points: LanguageTrendPoint[]) {
  return [...points].sort((a, b) => a.year - b.year || a.quarter - b.quarter)
}
