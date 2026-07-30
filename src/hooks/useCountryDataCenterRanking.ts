import { useEffect, useState } from 'react'

import { countDataCentersByCountry, loadAIDataCenters } from '@/data/loaders/loadAIDataCenters'
import type { CountryCount } from '@/components/charts/CountryRankingChart'

export function useCountryDataCenterRanking() {
  const [data, setData] = useState<CountryCount[] | null>(null)

  useEffect(() => {
    let cancelled = false
    loadAIDataCenters().then((dataCenters) => {
      if (!cancelled) setData(countDataCentersByCountry(dataCenters))
    })
    return () => {
      cancelled = true
    }
  }, [])

  return data
}
