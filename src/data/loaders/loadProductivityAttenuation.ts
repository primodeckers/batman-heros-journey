import { csvParse } from 'd3-dsv'

import type { ProductivityAttenuationPoint } from '@/types/data'

/** Atenuação do ganho de produtividade por camada de produção
 * (public/data/nber-productivity-attenuation.csv). */
export async function loadProductivityAttenuation(): Promise<ProductivityAttenuationPoint[]> {
  const res = await fetch('/data/nber-productivity-attenuation.csv')
  const text = await res.text()

  return csvParse(text, (row) => ({
    toolCategory: row['tool_category'] ?? '',
    layer: row['layer'] ?? '',
    layerOrder: Number(row['layer_order']),
    effectPct: Number(row['effect_pct']),
  }))
}
