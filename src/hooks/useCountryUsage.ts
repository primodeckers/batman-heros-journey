import { useEffect, useState } from 'react'

import { loadCountryUsage } from '@/data/loaders/loadCountryUsage'
import type { CountryUsageRow } from '@/types/data'

export function useCountryUsage() {
  const [data, setData] = useState<CountryUsageRow[] | null>(null)

  useEffect(() => {
    let cancelled = false
    loadCountryUsage().then((rows) => {
      if (!cancelled) setData(rows)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return data
}
