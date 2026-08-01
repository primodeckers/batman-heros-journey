import { useEffect, useState } from 'react'

import { loadDeathPoll, type DeathPollRow } from '@/data/loaders/loadDeathPoll'

export function useDeathPoll() {
  const [data, setData] = useState<DeathPollRow[] | null>(null)

  useEffect(() => {
    let cancelled = false
    loadDeathPoll().then((rows) => {
      if (!cancelled) setData(rows)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return data
}
