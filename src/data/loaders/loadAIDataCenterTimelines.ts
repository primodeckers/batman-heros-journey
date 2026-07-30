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

export type DataCenterWaterUse = {
  dataCenter: string
  peakWaterMgd: number
}

/** Maior uso de água (MGD) já registrado por data center, um por linha —
 * só os que têm valor > 0 (a maioria dos 75 data centers não reporta
 * água). Ordenado do maior pro menor. */
export function getPeakWaterUseByDataCenter(
  entries: AIDataCenterTimelineEntry[],
): DataCenterWaterUse[] {
  const peakByDataCenter = new Map<string, number>()
  for (const entry of entries) {
    if (entry.waterUseMgd === null) continue
    const current = peakByDataCenter.get(entry.dataCenter) ?? 0
    if (entry.waterUseMgd > current) {
      peakByDataCenter.set(entry.dataCenter, entry.waterUseMgd)
    }
  }
  return [...peakByDataCenter.entries()]
    .map(([dataCenter, peakWaterMgd]) => ({ dataCenter, peakWaterMgd }))
    .filter((d) => d.peakWaterMgd > 0)
    .sort((a, b) => b.peakWaterMgd - a.peakWaterMgd)
}

/** Maior uso de água (MGD) já registrado por data center, somado — pro card de pegada de água. */
export function getTotalPeakWaterUseMgd(entries: AIDataCenterTimelineEntry[]) {
  return getPeakWaterUseByDataCenter(entries).reduce((sum, d) => sum + d.peakWaterMgd, 0)
}
