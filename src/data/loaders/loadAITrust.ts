import { csvParse } from 'd3-dsv'

import type { CategoryCount } from '@/types/data'

/** Confiança na precisão do código gerado por IA (public/data/stackoverflow-ai-trust.csv). */
export async function loadAITrust(): Promise<CategoryCount[]> {
  const res = await fetch('/data/stackoverflow-ai-trust.csv')
  const text = await res.text()

  return csvParse(text, (row) => ({
    category: row['category'] ?? '',
    count: Number(row['count']),
  }))
}
