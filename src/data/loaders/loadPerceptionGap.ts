import { csvParse } from 'd3-dsv'

import type { PerceptionGapPoint } from '@/types/data'

/** Gap entre percepção e realidade de velocidade com IA (public/data/metr-perception-gap.csv). */
export async function loadPerceptionGap(): Promise<PerceptionGapPoint[]> {
  const res = await fetch('/data/metr-perception-gap.csv')
  const text = await res.text()

  return csvParse(text, (row) => ({
    stage: row['stage'] ?? '',
    order: Number(row['order']),
    label: row['label'] ?? '',
    effectPct: Number(row['effect_pct']),
  })).sort((a, b) => a.order - b.order)
}
