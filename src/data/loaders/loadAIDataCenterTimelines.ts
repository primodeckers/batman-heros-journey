import { csvParse } from 'd3-dsv'

import type { AIDataCenterTimelineEntry } from '@/types/data'
import { parseNullableNumber } from '@/utils/csv'

export async function loadAIDataCenterTimelines(): Promise<AIDataCenterTimelineEntry[]> {
  const res = await fetch('/data/epoch-ai-data-center-timelines.csv')
  const text = await res.text()

  return csvParse(text, (row) => ({
    dataCenter: row['Data center'] ?? '',
    date: new Date(row['Date'] ?? ''),
    powerMw: parseNullableNumber(row['Power (MW)']),
    h100Equivalents: parseNullableNumber(row['H100 equivalents']),
    waterUseMgd: parseNullableNumber(row['Water use (MGD)']),
  }))
}

/** Primeiro marco registrado de cada data center — usado pro mapa animado (data de "nascimento"). */
export function getFirstEntryPerDataCenter(entries: AIDataCenterTimelineEntry[]) {
  const first = new Map<string, AIDataCenterTimelineEntry>()
  for (const entry of entries) {
    const current = first.get(entry.dataCenter)
    if (!current || entry.date < current.date) {
      first.set(entry.dataCenter, entry)
    }
  }
  return [...first.values()].sort((a, b) => a.date.getTime() - b.date.getTime())
}

/** Maior uso de água (MGD) já registrado por data center, somado — pro card de pegada de água. */
export function getTotalPeakWaterUseMgd(entries: AIDataCenterTimelineEntry[]) {
  const peakByDataCenter = new Map<string, number>()
  for (const entry of entries) {
    if (entry.waterUseMgd === null) continue
    const current = peakByDataCenter.get(entry.dataCenter) ?? 0
    if (entry.waterUseMgd > current) {
      peakByDataCenter.set(entry.dataCenter, entry.waterUseMgd)
    }
  }
  return [...peakByDataCenter.values()].reduce((sum, v) => sum + v, 0)
}
