import { useEffect, useState } from 'react'

import { loadAdaptationsTimeline, type AdaptationRow } from '@/data/loaders/loadAdaptationsTimeline'

export function useAdaptationsTimeline() {
  const [data, setData] = useState<AdaptationRow[] | null>(null)

  useEffect(() => {
    let cancelled = false
    loadAdaptationsTimeline().then((rows) => {
      if (!cancelled) setData(rows)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return data
}
