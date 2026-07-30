import { useEffect, useState } from 'react'

import { getEstimatesByMetric, loadIEAEstimates } from '@/data/loaders/loadIEAEstimates'
import type { IEAEstimate } from '@/types/data'

/** Estimativa da pegada de água da IA (IEA / ScienceDirect, via IEA CSV). */
export function useWaterFootprintEstimate() {
  const [data, setData] = useState<IEAEstimate | null>(null)

  useEffect(() => {
    let cancelled = false
    loadIEAEstimates().then((estimates) => {
      const [estimate] = getEstimatesByMetric(estimates, 'ai_water_footprint_billion_liters')
      if (!cancelled && estimate) setData(estimate)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return data
}
