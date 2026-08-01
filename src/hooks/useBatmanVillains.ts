import { useEffect, useState } from 'react'

import { loadBatmanVillains, type VillainRow } from '@/data/loaders/loadBatmanVillains'

export function useBatmanVillains() {
  const [data, setData] = useState<VillainRow[] | null>(null)

  useEffect(() => {
    let cancelled = false
    loadBatmanVillains().then((rows) => {
      if (!cancelled) setData(rows)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return data
}
