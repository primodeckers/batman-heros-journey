import { useEffect, useState } from 'react'

import {
  getLatestDemandPerCountry,
  loadElectricityDemandByCountry,
} from '@/data/loaders/loadElectricityDemandByCountry'
import { getEstimatesByMetric, loadIEAEstimates } from '@/data/loaders/loadIEAEstimates'

export type ElectricityComparisonRow = {
  label: string
  electricityDemandTwh: number
  isAI: boolean
}

const COUNTRIES_AROUND_AI = 2

/** Onde a projeção de consumo de data centers de IA em 2030 entraria no
 * ranking mundial de demanda elétrica por país (OWID, ano mais recente). */
export function useElectricityEquivalence() {
  const [data, setData] = useState<ElectricityComparisonRow[] | null>(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([loadElectricityDemandByCountry(), loadIEAEstimates()]).then(
      ([demandRows, estimates]) => {
        if (cancelled) return

        const latest = getLatestDemandPerCountry(demandRows)
        const projection2030 = getEstimatesByMetric(estimates, 'data_center_electricity_twh').find(
          (e) => e.year === 2030,
        )
        if (!projection2030) return

        const merged: ElectricityComparisonRow[] = [
          ...latest.map((d) => ({
            label: d.country,
            electricityDemandTwh: d.electricityDemandTwh,
            isAI: false,
          })),
          {
            label: 'IA (2030)',
            electricityDemandTwh: projection2030.valueHigh,
            isAI: true,
          },
        ].sort((a, b) => b.electricityDemandTwh - a.electricityDemandTwh)

        const aiIndex = merged.findIndex((d) => d.isAI)
        setData(
          merged.slice(
            Math.max(0, aiIndex - COUNTRIES_AROUND_AI),
            aiIndex + COUNTRIES_AROUND_AI + 1,
          ),
        )
      },
    )
    return () => {
      cancelled = true
    }
  }, [])

  return data
}
