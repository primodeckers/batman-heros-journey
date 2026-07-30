import { useEffect, useState } from 'react'

import { loadAIDataCenters } from '@/data/loaders/loadAIDataCenters'
import {
  getPeakWaterUseByDataCenter,
  loadAIDataCenterTimelines,
} from '@/data/loaders/loadAIDataCenterTimelines'

export type WaterUseRankingRow = {
  dataCenter: string
  country: string | null
  peakWaterMgd: number
  /** Marca valores implausíveis mantidos por transparência (ver docs/temas-candidatos.md). */
  flagged: boolean
}

/** Acima disso, o valor é maior que o consumo de água de Nova York inteira
 * por dia — quase certamente um erro na fonte, mas mantido e sinalizado
 * em vez de escondido. */
const IMPLAUSIBLE_THRESHOLD_MGD = 2000

export function useWaterUseRanking() {
  const [data, setData] = useState<WaterUseRankingRow[] | null>(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([loadAIDataCenterTimelines(), loadAIDataCenters()]).then(
      ([timelines, dataCenters]) => {
        if (cancelled) return

        const countryByName = new Map(dataCenters.map((dc) => [dc.name, dc.country]))
        const ranked = getPeakWaterUseByDataCenter(timelines).map((d) => ({
          dataCenter: d.dataCenter,
          country: countryByName.get(d.dataCenter) ?? null,
          peakWaterMgd: d.peakWaterMgd,
          flagged: d.peakWaterMgd > IMPLAUSIBLE_THRESHOLD_MGD,
        }))
        setData(ranked)
      },
    )
    return () => {
      cancelled = true
    }
  }, [])

  return data
}
