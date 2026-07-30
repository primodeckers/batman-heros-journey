import { useEffect, useState } from 'react'
import type { Feature, Geometry } from 'geojson'

import {
  aggregateDataCentersByCountry,
  loadAIDataCenters,
  type CountryDataCenterAggregate,
} from '@/data/loaders/loadAIDataCenters'
import { loadWorldCountries } from '@/data/loaders/loadWorldCountries'

export function useAIDataCenterMapData() {
  const [countries, setCountries] = useState<Feature<Geometry>[] | null>(null)
  const [bubbles, setBubbles] = useState<CountryDataCenterAggregate[] | null>(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([loadWorldCountries(), loadAIDataCenters()]).then(([world, dataCenters]) => {
      if (cancelled) return
      setCountries(world)
      setBubbles(aggregateDataCentersByCountry(dataCenters))
    })
    return () => {
      cancelled = true
    }
  }, [])

  return { countries, bubbles }
}
