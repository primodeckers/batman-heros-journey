import { useEffect, useState } from 'react'

import { loadComicsTimeline, type ComicsTimelineRow } from '@/data/loaders/loadComicsTimeline'

export function useComicsTimeline() {
  const [data, setData] = useState<ComicsTimelineRow[] | null>(null)

  useEffect(() => {
    let cancelled = false
    loadComicsTimeline().then((rows) => {
      if (!cancelled) setData(rows)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return data
}
