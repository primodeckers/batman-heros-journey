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
}

/** Acima disso, o valor é maior que o consumo de água de Nova York inteira
 * por dia — implausível e sem como confirmar na fonte, então excluído em
 * vez de exibido (ex.: "Meta Kuna" com 70.000 MGD no dataset da Epoch AI). */
const IMPLAUSIBLE_THRESHOLD_MGD = 2000

export function useWaterUseRanking() {
  const [data, setData] = useState<WaterUseRankingRow[] | null>(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([loadAIDataCenterTimelines(), loadAIDataCenters()]).then(
      ([timelines, dataCenters]) => {
        if (cancelled) return

        const countryByName = new Map(dataCenters.map((dc) => [dc.name, dc.country]))
        const ranked = getPeakWaterUseByDataCenter(timelines)
          .filter((d) => d.peakWaterMgd <= IMPLAUSIBLE_THRESHOLD_MGD)
          .map((d) => ({
            dataCenter: d.dataCenter,
            country: countryByName.get(d.dataCenter) ?? null,
            peakWaterMgd: d.peakWaterMgd,
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
