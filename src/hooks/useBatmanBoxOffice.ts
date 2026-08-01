import { useEffect, useState } from 'react'

import { loadBatmanBoxOffice, type BatmanBoxOfficeRow } from '@/data/loaders/loadBatmanBoxOffice'

export function useBatmanBoxOffice() {
  const [data, setData] = useState<BatmanBoxOfficeRow[] | null>(null)

  useEffect(() => {
    let cancelled = false
    loadBatmanBoxOffice().then((rows) => {
      if (!cancelled) setData(rows)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return data
}
