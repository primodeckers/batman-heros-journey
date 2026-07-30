import { useEffect, useState } from 'react'

import { loadLanguageTrend, sortByQuarter } from '@/data/loaders/loadLanguageTrend'
import type { LanguageTrendPoint } from '@/types/data'

export function useLanguageTrend() {
  const [data, setData] = useState<LanguageTrendPoint[] | null>(null)

  useEffect(() => {
    let cancelled = false
    loadLanguageTrend().then((rows) => {
      if (!cancelled) setData(sortByQuarter(rows))
    })
    return () => {
      cancelled = true
    }
  }, [])

  return data
}
