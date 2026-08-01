import { csvParse } from 'd3-dsv'

export type DeathPollRow = { outcome: string; votes: number }

/**
 * Enquete por telefone de "A Death in the Family" (1988): 10.614 votos em
 * 36h, decidindo se Jason Todd (2º Robin) morria. Números conferidos contra
 * cobertura da ComicBook.com, Gizmodo e Wikipedia em 01/08/2026 — ver
 * docs/references/fontes-dados.md.
 */
export async function loadDeathPoll(): Promise<DeathPollRow[]> {
  const res = await fetch('/data/batman-death-poll.csv')
  const text = await res.text()

  return csvParse(text, (row) => ({
    outcome: row['outcome'] ?? '',
    votes: Number(row['votes']),
  }))
}
