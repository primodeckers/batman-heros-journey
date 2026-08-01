import { csvParse } from 'd3-dsv'

export type AdaptationRow = {
  year: number
  title: string
  medium: 'Quadrinho' | 'Cinema' | 'TV'
  note: string
}

/**
 * Marcos de 86 anos de Batman em diferentes mídias — reforça a fase
 * "mundo comum" do monomito: um herói que atravessa gerações. Datas
 * verificadas contra Wikipedia em 01/08/2026 — ver
 * docs/references/fontes-dados.md.
 */
export async function loadAdaptationsTimeline(): Promise<AdaptationRow[]> {
  const res = await fetch('/data/batman-adaptations-timeline.csv')
  const text = await res.text()

  return csvParse(text, (row) => ({
    year: Number(row['year']),
    title: row['title'] ?? '',
    medium: (row['medium'] as AdaptationRow['medium']) ?? 'Cinema',
    note: row['note'] ?? '',
  }))
}
