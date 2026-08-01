import { csvParse } from 'd3-dsv'

export type BatmanBoxOfficeRow = {
  year: number
  title: string
  worldwideGrossUsd: number
  budgetUsd: number
  rtScore: number
  era: string
}

/**
 * Bilheteria mundial / orçamento / nota do Rotten Tomatoes de cada filme
 * live-action do Batman (1989-2022). Números conferidos contra Box Office
 * Mojo, Rotten Tomatoes e Wikipedia em 01/08/2026 — ver
 * docs/references/fontes-dados.md pras fontes específicas de cada número.
 */
export async function loadBatmanBoxOffice(): Promise<BatmanBoxOfficeRow[]> {
  const res = await fetch('/data/batman-boxoffice.csv')
  const text = await res.text()

  return csvParse(text, (row) => ({
    year: Number(row['year']),
    title: row['title'] ?? '',
    worldwideGrossUsd: Number(row['worldwide_gross_usd']),
    budgetUsd: Number(row['budget_usd']),
    rtScore: Number(row['rt_score']),
    era: row['era'] ?? '',
  }))
}
