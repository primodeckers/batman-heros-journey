import { useEffect, useState } from 'react'

import { getEstimatesByMetric, loadIEAEstimates } from '@/data/loaders/loadIEAEstimates'
import type { IEAEstimate } from '@/types/data'

/** Faixas de incerteza do consumo de servidores de IA nos EUA (Carbon Brief, via IEA CSV). */
export function useEnergyUncertaintyRange() {
  const [data, setData] = useState<IEAEstimate[] | null>(null)

  useEffect(() => {
    let cancelled = false
    loadIEAEstimates().then((estimates) => {
      if (!cancelled) {
        setData(getEstimatesByMetric(estimates, 'ai_servers_us_electricity_twh'))
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  return data
}
