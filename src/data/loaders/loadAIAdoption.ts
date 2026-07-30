import { csvParse } from 'd3-dsv'

import type { CategoryCount } from '@/types/data'

/** Quantos desenvolvedores usam IA pra programar, por frequência (public/data/stackoverflow-ai-adoption.csv). */
export async function loadAIAdoption(): Promise<CategoryCount[]> {
  const res = await fetch('/data/stackoverflow-ai-adoption.csv')
  const text = await res.text()

  return csvParse(text, (row) => ({
    category: row['category'] ?? '',
    count: Number(row['count']),
  }))
}
