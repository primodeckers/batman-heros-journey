import { csvParse } from 'd3-dsv'

import { asset } from '@/utils/asset'

export type VillainRow = { year: number; title: string; villain: string; actor: string }

/**
 * Vilão(ões) principal(is) de cada filme live-action do Batman e o ator que
 * o interpretou. Dado de crédito de elenco, verificável em Wikipedia —
 * ver docs/references/fontes-dados.md.
 */
export async function loadBatmanVillains(): Promise<VillainRow[]> {
  const res = await fetch(asset('data/batman-villains.csv'))
  const text = await res.text()

  return csvParse(text, (row) => ({
    year: Number(row['year']),
    title: row['title'] ?? '',
    villain: row['villain'] ?? '',
    actor: row['actor'] ?? '',
  }))
}
