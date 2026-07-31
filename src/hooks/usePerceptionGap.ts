import { useEffect, useState } from 'react'

import { loadPerceptionGap } from '@/data/loaders/loadPerceptionGap'
import type { PerceptionGapPoint } from '@/types/data'

export function usePerceptionGap() {
  const [data, setData] = useState<PerceptionGapPoint[] | null>(null)

  useEffect(() => {
    let cancelled = false
    loadPerceptionGap().then((rows) => {
      if (!cancelled) setData(rows)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return data
}
