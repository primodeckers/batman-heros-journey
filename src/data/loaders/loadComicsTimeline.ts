import { csvParse } from 'd3-dsv'

import { asset } from '@/utils/asset'

export type ComicsTimelineRow = {
  year: number
  title: string
  event: string
  type: 'queda' | 'retorno'
}

/**
 * Linha do tempo de "quase-mortes" e retornos do Batman nos quadrinhos —
 * mostra que o padrão morte/ressurreição não é um caso único (a enquete de
 * 1988), mas se repete várias vezes em 22 anos de história editorial.
 * Datas e eventos verificados contra Wikipedia, DC Database (Fandom) e
 * CBR em 01/08/2026 — ver docs/references/fontes-dados.md.
 */
export async function loadComicsTimeline(): Promise<ComicsTimelineRow[]> {
  const res = await fetch(asset('data/batman-comics-timeline.csv'))
  const text = await res.text()

  return csvParse(text, (row) => ({
    year: Number(row['year']),
    title: row['title'] ?? '',
    event: row['event'] ?? '',
    type: (row['type'] as 'queda' | 'retorno') ?? 'queda',
  }))
}
