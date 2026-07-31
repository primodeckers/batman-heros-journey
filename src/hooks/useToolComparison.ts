import { useEffect, useState } from 'react'

import { loadToolComparison } from '@/data/loaders/loadToolComparison'
import type { ToolComparisonRow } from '@/types/data'

export function useToolComparison() {
  const [data, setData] = useState<ToolComparisonRow[] | null>(null)

  useEffect(() => {
    let cancelled = false
    loadToolComparison().then((rows) => {
      if (!cancelled) setData(rows)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return data
}
