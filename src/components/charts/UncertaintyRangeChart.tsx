import { Group } from '@visx/group'
import { ParentSize } from '@visx/responsive'
import { scaleBand, scaleLinear } from '@visx/scale'
import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import type { IEAEstimate } from '@/types/data'

type ChartProps = {
  data: IEAEstimate[]
  width: number
  height: number
}

const MARGIN = { top: 8, right: 16, bottom: 24, left: 48 }

function Chart({ data, width, height }: ChartProps) {
  const innerWidth = Math.max(width - MARGIN.left - MARGIN.right, 0)
  const innerHeight = Math.max(height - MARGIN.top - MARGIN.bottom, 0)

  const yScale = scaleBand<string>({
    domain: data.map((d) => String(d.year)),
    range: [0, innerHeight],
    padding: 0.45,
  })

  const xScale = scaleLinear<number>({
    domain: [0, Math.max(...data.map((d) => d.valueHigh))],
    range: [0, innerWidth],
    nice: true,
  })

  const barHeight = yScale.bandwidth()

  return (
    <svg
      width={width}
      height={height}
      role="img"
      aria-label="Faixa de incerteza do consumo de energia dos servidores de IA, em TWh, por ano"
    >
      <Group left={MARGIN.left} top={MARGIN.top}>
        {data.map((d) => {
          const barY = yScale(String(d.year)) ?? 0
          const x0 = xScale(d.valueLow)
          const x1 = xScale(d.valueHigh)
          return (
            <Group key={d.year} top={barY}>
              <text x={0} y={-6} fontSize={12} fill={neutral[600]}>
                {d.year}
              </text>
              <motion.rect
                x={x0}
                width={x1 - x0}
                height={barHeight}
                rx={barHeight / 2}
                fill={accent[400]}
                initial={{ opacity: 0.35 }}
                animate={{ opacity: [0.35, 0.75, 0.35] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <text
                x={x0 - 6}
                y={barHeight / 2}
                dy=".35em"
                textAnchor="end"
                fontSize={11}
                fill={neutral[600]}
              >
                {d.valueLow}
              </text>
              <text
                x={x1 + 6}
                y={barHeight / 2}
                dy=".35em"
                fontSize={11}
                fontWeight={600}
                fill={accent[700]}
              >
                {d.valueHigh} {d.unit}
              </text>
            </Group>
          )
        })}
      </Group>
    </svg>
  )
}

export function UncertaintyRangeChart({ data }: { data: IEAEstimate[] }) {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 && height > 0 ? <Chart data={data} width={width} height={height} /> : null
      }
    </ParentSize>
  )
}
