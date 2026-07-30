import { Group } from '@visx/group'
import { ParentSize } from '@visx/responsive'
import { scaleBand, scaleLinear } from '@visx/scale'
import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'

export type CountryCount = { country: string; count: number }

type ChartProps = {
  data: CountryCount[]
  width: number
  height: number
}

const MARGIN = { top: 8, right: 36, bottom: 8, left: 120 }

function Chart({ data, width, height }: ChartProps) {
  const innerWidth = Math.max(width - MARGIN.left - MARGIN.right, 0)
  const innerHeight = Math.max(height - MARGIN.top - MARGIN.bottom, 0)

  const yScale = scaleBand<string>({
    domain: data.map((d) => d.country),
    range: [0, innerHeight],
    padding: 0.3,
  })

  const xScale = scaleLinear<number>({
    domain: [0, Math.max(...data.map((d) => d.count))],
    range: [0, innerWidth],
    nice: true,
  })

  const barHeight = yScale.bandwidth()

  return (
    <svg width={width} height={height} role="img" aria-label="Ranking de países por número de data centers de IA">
      <Group left={MARGIN.left} top={MARGIN.top}>
        {data.map((d, i) => {
          const barY = yScale(d.country) ?? 0
          const barWidth = xScale(d.count)
          const isTop = i === 0
          return (
            <Group key={d.country} top={barY}>
              <text
                x={-8}
                y={barHeight / 2}
                dy=".35em"
                textAnchor="end"
                fontSize={12}
                fill={neutral[600]}
              >
                {d.country}
              </text>
              <motion.rect
                initial={{ width: 0 }}
                animate={{ width: barWidth }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: 'easeOut' }}
                height={barHeight}
                rx={4}
                fill={isTop ? accent[500] : neutral[300]}
              />
              <text
                x={barWidth + 8}
                y={barHeight / 2}
                dy=".35em"
                fontSize={12}
                fontWeight={isTop ? 600 : 400}
                fill={isTop ? accent[700] : neutral[600]}
              >
                {d.count}
              </text>
            </Group>
          )
        })}
      </Group>
    </svg>
  )
}

export function CountryRankingChart({ data }: { data: CountryCount[] }) {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 && height > 0 ? <Chart data={data} width={width} height={height} /> : null
      }
    </ParentSize>
  )
}
