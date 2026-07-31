import { useEffect, useState } from 'react'
import type { Feature, Geometry } from 'geojson'

import { loadCountryUsage } from '@/data/loaders/loadCountryUsage'
import { loadWorldCountries } from '@/data/loaders/loadWorldCountries'
import type { CountryUsageRow } from '@/types/data'

export function useAIWorldMapData() {
  const [countries, setCountries] = useState<Feature<Geometry>[] | null>(null)
  const [usage, setUsage] = useState<CountryUsageRow[] | null>(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([loadWorldCountries(), loadCountryUsage()]).then(([world, usageRows]) => {
      if (cancelled) return
      setCountries(world)
      setUsage(usageRows)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return { countries, usage }
}
