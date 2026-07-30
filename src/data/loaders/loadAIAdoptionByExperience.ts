import { csvParse } from 'd3-dsv'

import type { AIAdoptionByExperience } from '@/types/data'

/** Adoção de IA por faixa de anos de experiência (public/data/stackoverflow-ai-adoption-by-experience.csv). */
export async function loadAIAdoptionByExperience(): Promise<AIAdoptionByExperience[]> {
  const res = await fetch('/data/stackoverflow-ai-adoption-by-experience.csv')
  const text = await res.text()

  return csvParse(text, (row) => ({
    experience: row['experience'] ?? '',
    count: Number(row['count']),
    total: Number(row['total']),
    pct: Number(row['pct']),
  }))
}
