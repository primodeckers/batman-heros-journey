import { useEffect, useState } from 'react'

import { loadAIVendors, type AIVendorCount } from '@/data/loaders/loadAIVendors'

export function useAIVendors() {
  const [data, setData] = useState<AIVendorCount[] | null>(null)

  useEffect(() => {
    let cancelled = false
    loadAIVendors().then((rows) => {
      if (!cancelled) setData(rows)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return data
}
