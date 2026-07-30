import { ParentSize } from '@visx/responsive'
import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import type { IEAEstimate } from '@/types/data'

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
}

/** Path de um arco de círculo (não donut) — usado tanto pro track quanto
 * pro preenchimento animado via stroke-dasharray. */
function describeSemicircle(cx: number, cy: number, r: number) {
  const start = polarToCartesian(cx, cy, r, Math.PI)
  const end = polarToCartesian(cx, cy, r, 2 * Math.PI)
  return `M ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${end.x} ${end.y}`
}

type GaugeProps = {
  estimate: IEAEstimate
  maxScale: number
  size: number
}

function Gauge({ estimate, maxScale, size }: GaugeProps) {
  const r = size / 2 - 12
  const cx = size / 2
  const cy = size / 2
  const strokeWidth = Math.max(6, size * 0.07)

  const trackPath = describeSemicircle(cx, cy, r)
  const arcLength = Math.PI * r

  const highFraction = Math.min(estimate.valueHigh / maxScale, 1)
  const lowAngle = Math.PI + (estimate.valueLow / maxScale) * Math.PI
  const lowMarker = polarToCartesian(cx, cy, r, lowAngle)

  return (
    <svg
      width={size}
      height={size / 2 + 24}
      role="img"
      aria-label={`Faixa de incerteza em ${estimate.year}: entre ${estimate.valueLow} e ${estimate.valueHigh} ${estimate.unit}`}
    >
      <path d={trackPath} fill="none" stroke={neutral[200]} strokeWidth={strokeWidth} />
      <motion.path
        d={trackPath}
        fill="none"
        stroke={accent[500]}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`${arcLength} ${arcLength}`}
        initial={{ strokeDashoffset: arcLength }}
        animate={{ strokeDashoffset: arcLength * (1 - highFraction) }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      />
      <motion.circle
        cx={lowMarker.x}
        cy={lowMarker.y}
        r={strokeWidth * 0.55}
        fill={accent[800]}
        stroke="white"
        strokeWidth={1.5}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 1 }}
      />
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize={size * 0.11} fontWeight={600} fill={accent[700]}>
        {estimate.valueHigh}
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize={size * 0.055} fill={neutral[600]}>
        {estimate.unit} até • mín. {estimate.valueLow}
      </text>
      <text x={cx} y={size / 2 + 18} textAnchor="middle" fontSize={size * 0.065} fontWeight={600} fill={neutral[700]}>
        {estimate.year}
      </text>
    </svg>
  )
}

function Chart({ data, width, height }: { data: IEAEstimate[]; width: number; height: number }) {
  const maxScale = Math.max(...data.map((d) => d.valueHigh)) * 1.05
  const gaugeSize = Math.min(width / data.length - 12, height * 1.7)

  return (
    <div className="flex h-full items-center justify-center gap-4">
      {data.map((estimate) => (
        <Gauge key={estimate.year} estimate={estimate} maxScale={maxScale} size={gaugeSize} />
      ))}
    </div>
  )
}

export function RadialUncertaintyGauge({ data }: { data: IEAEstimate[] }) {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 && height > 0 ? <Chart data={data} width={width} height={height} /> : null
      }
    </ParentSize>
  )
}
