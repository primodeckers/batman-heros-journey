import { useEffect, useState } from 'react'

import { loadAITrust } from '@/data/loaders/loadAITrust'
import type { CategoryCount } from '@/types/data'

export function useAITrust() {
  const [data, setData] = useState<CategoryCount[] | null>(null)

  useEffect(() => {
    let cancelled = false
    loadAITrust().then((rows) => {
      if (!cancelled) setData(rows)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return data
}
