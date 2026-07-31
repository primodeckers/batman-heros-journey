import { useEffect, useState } from 'react'

import { loadProductivityAttenuation } from '@/data/loaders/loadProductivityAttenuation'
import type { ProductivityAttenuationPoint } from '@/types/data'

export function useProductivityAttenuation() {
  const [data, setData] = useState<ProductivityAttenuationPoint[] | null>(null)

  useEffect(() => {
    let cancelled = false
    loadProductivityAttenuation().then((rows) => {
      if (!cancelled) setData(rows)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return data
}
