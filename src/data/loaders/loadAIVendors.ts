import { csvParse } from 'd3-dsv'

/** Qual empresa de IA os desenvolvedores usam (public/data/stackoverflow-ai-vendors.csv). */
export type AIVendorCount = {
  vendor: string
  count: number
}

export async function loadAIVendors(): Promise<AIVendorCount[]> {
  const res = await fetch('/data/stackoverflow-ai-vendors.csv')
  const text = await res.text()

  return csvParse(text, (row) => ({
    vendor: row['vendor'] ?? '',
    count: Number(row['count']),
  }))
}
