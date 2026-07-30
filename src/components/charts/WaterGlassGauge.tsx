import { ParentSize } from '@visx/responsive'
import { motion } from 'framer-motion'

import { neutral, water } from '@/theme/palette'
import type { IEAEstimate } from '@/types/data'

const BUBBLE_COUNT = 4

/** 1 piscina olímpica = 2,5 milhões de litros. Valor de IEAEstimate já
 * vem em bilhões de litros (1e9), então piscinas = valor * (1e9/2.5e6). */
const OLYMPIC_POOLS_PER_BILLION_LITERS = 400

function Chart({ data, width, height }: { data: IEAEstimate; width: number; height: number }) {
  const labelSpace = 52
  const gh = Math.min(height - labelSpace, width * 1.1)
  const gw = gh * 0.62
  const gx = width / 2 - gw / 2
  const gy = 8
  const radius = gw * 0.1
  const clipId = 'water-glass-clip'

  const maxValue = data.valueHigh * 1.1
  const fillHeight = (data.valueHigh / maxValue) * (gh - 4)
  const fillY = gy + 2 + (gh - 4 - fillHeight)
  const lowY = gy + 2 + (gh - 4) * (1 - data.valueLow / maxValue)

  const poolsLow = Math.round(data.valueLow * OLYMPIC_POOLS_PER_BILLION_LITERS)
  const poolsHigh = Math.round(data.valueHigh * OLYMPIC_POOLS_PER_BILLION_LITERS)

  return (
    <div className="flex h-full flex-col items-center justify-center gap-1">
      <svg width={width} height={gh + labelSpace} role="img" aria-label={`Pegada de água estimada da IA em ${data.year}, entre ${data.valueLow} e ${data.valueHigh} ${data.unit}, equivalente a entre ${poolsLow} e ${poolsHigh} piscinas olímpicas`}>
        <defs>
          <clipPath id={clipId}>
            <rect x={gx + 2} y={gy + 2} width={gw - 4} height={gh - 4} rx={radius} />
          </clipPath>
        </defs>

        <rect
          x={gx}
          y={gy}
          width={gw}
          height={gh}
          rx={radius}
          fill="none"
          stroke={neutral[400]}
          strokeWidth={2}
        />

        <g clipPath={`url(#${clipId})`}>
          <motion.rect
            x={gx + 2}
            width={gw - 4}
            fill={water[400]}
            initial={{ y: gy + gh, height: 0 }}
            animate={{ y: fillY, height: fillHeight }}
            transition={{ duration: 1.3, ease: 'easeOut' }}
          />
          <motion.rect
            x={gx + 2}
            width={gw - 4}
            height={3}
            fill={water[600]}
            initial={{ y: gy + gh }}
            animate={{ y: [fillY - 1, fillY + 1, fillY - 1] }}
            transition={{
              y: { duration: 1.3, ease: 'easeOut' },
            }}
          />
          {Array.from({ length: BUBBLE_COUNT }).map((_, i) => (
            <motion.circle
              key={i}
              cx={gx + gw * (0.25 + 0.5 * ((i % 2) as 0 | 1)) + (i - 1.5) * 6}
              r={2.2}
              fill="white"
              fillOpacity={0.7}
              initial={{ cy: gy + gh - 4 }}
              animate={{ cy: [gy + gh - 4, fillY + 4] }}
              transition={{
                duration: 2.4 + i * 0.4,
                repeat: Infinity,
                delay: 1.3 + i * 0.5,
                ease: 'easeIn',
              }}
            />
          ))}
        </g>

        <motion.line
          x1={gx - 6}
          x2={gx + gw + 6}
          y1={lowY}
          y2={lowY}
          stroke={water[800]}
          strokeWidth={1.5}
          strokeDasharray="3 2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.4 }}
        />

        <text x={width / 2} y={gy + gh + 20} textAnchor="middle" fontSize={12} fontWeight={600} fill={neutral[700]}>
          {data.valueLow.toLocaleString('pt-BR')}–{data.valueHigh.toLocaleString('pt-BR')} {data.unit}
        </text>
        <text x={width / 2} y={gy + gh + 38} textAnchor="middle" fontSize={11} fill={water[700]}>
          {poolsLow.toLocaleString('pt-BR')}–{poolsHigh.toLocaleString('pt-BR')} piscinas olímpicas
        </text>
      </svg>
    </div>
  )
}

export function WaterGlassGauge({ data }: { data: IEAEstimate }) {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 && height > 0 ? <Chart data={data} width={width} height={height} /> : null
      }
    </ParentSize>
  )
}
