import { Droplet } from 'lucide-react'
import { motion } from 'framer-motion'

import { water } from '@/theme/palette'
import type { IEAEstimate } from '@/types/data'

const TOTAL_ICONS = 48
const ICON_COLUMNS = 8

/** 1 piscina olímpica = 2,5 milhões de litros. Valor de IEAEstimate já
 * vem em bilhões de litros (1e9), então piscinas = valor * (1e9/2.5e6). */
const OLYMPIC_POOLS_PER_BILLION_LITERS = 400

export function WaterDropletGrid({ data }: { data: IEAEstimate }) {
  const poolsLow = Math.round(data.valueLow * OLYMPIC_POOLS_PER_BILLION_LITERS)
  const poolsHigh = Math.round(data.valueHigh * OLYMPIC_POOLS_PER_BILLION_LITERS)
  const poolsPerIcon = poolsHigh / TOTAL_ICONS
  const solidIcons = Math.round((data.valueLow / data.valueHigh) * TOTAL_ICONS)

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${ICON_COLUMNS}, minmax(0, 1fr))` }}
        role="img"
        aria-label={`Pegada de água estimada da IA em ${data.year}: entre ${data.valueLow} e ${data.valueHigh} ${data.unit}, equivalente a entre ${poolsLow.toLocaleString('pt-BR')} e ${poolsHigh.toLocaleString('pt-BR')} piscinas olímpicas`}
      >
        {Array.from({ length: TOTAL_ICONS }).map((_, i) => {
          const isConfirmed = i < solidIcons
          return (
            <motion.div
              key={i}
              aria-hidden
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.015, ease: 'backOut' }}
            >
              <Droplet
                className="size-5"
                fill={isConfirmed ? water[500] : 'none'}
                color={isConfirmed ? water[600] : water[300]}
                strokeWidth={isConfirmed ? 1.5 : 1.5}
              />
            </motion.div>
          )
        })}
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold" style={{ color: water[700] }}>
          {data.valueLow.toLocaleString('pt-BR')}–{data.valueHigh.toLocaleString('pt-BR')} {data.unit}
        </p>
        <p className="mt-1 max-w-xs text-xs text-muted-foreground">
          Cada gota ≈ {Math.round(poolsPerIcon).toLocaleString('pt-BR')} piscinas olímpicas —
          cheias: mínimo confirmado · claras: faixa de incerteza até o máximo
        </p>
      </div>
    </div>
  )
}
