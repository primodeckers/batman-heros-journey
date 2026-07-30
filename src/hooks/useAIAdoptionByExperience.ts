import { useEffect, useState } from 'react'

import { loadAIAdoptionByExperience } from '@/data/loaders/loadAIAdoptionByExperience'
import type { AIAdoptionByExperience } from '@/types/data'

export function useAIAdoptionByExperience() {
  const [data, setData] = useState<AIAdoptionByExperience[] | null>(null)

  useEffect(() => {
    let cancelled = false
    loadAIAdoptionByExperience().then((rows) => {
      if (!cancelled) setData(rows)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return data
}
