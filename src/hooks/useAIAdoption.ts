import { useEffect, useState } from 'react'

import { loadAIAdoption } from '@/data/loaders/loadAIAdoption'
import type { CategoryCount } from '@/types/data'

export function useAIAdoption() {
  const [data, setData] = useState<CategoryCount[] | null>(null)

  useEffect(() => {
    let cancelled = false
    loadAIAdoption().then((rows) => {
      if (!cancelled) setData(rows)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return data
}
