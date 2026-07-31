import { Group } from '@visx/group'
import { ParentSize } from '@visx/responsive'
import { scaleBand, scaleLinear } from '@visx/scale'
import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import { truncateToWidth } from '@/utils/text'
import type { CountryUsageRow } from '@/types/data'

const BRAZIL_RANK = 69
const BRAZIL_TOTAL = 166
const BRAZIL_INDEX = 0.93

type ChartProps = { data: CountryUsageRow[]; width: number; height: number }

function Chart({ data, width, height }: ChartProps) {
  const fontSize = width < 260 ? 9 : 11
  const captionHeight = 22

  const marginLeft = Math.max(70, Math.min(140, width * 0.32))
  const marginRight = Math.max(40, Math.min(56, width * 0.14))
  const margin = { top: 8, right: marginRight, bottom: 8, left: marginLeft }
  const innerWidth = Math.max(width - margin.left - margin.right, 0)
  const innerHeight = Math.max(height - margin.top - margin.bottom - captionHeight, 0)

  const yScale = scaleBand<string>({
    domain: data.map((d) => d.country),
    range: [0, innerHeight],
    padding: 0.3,
  })
  const xScale = scaleLinear<number>({
    domain: [0, Math.max(...data.map((d) => d.usagePerCapitaIndex))],
    range: [0, innerWidth],
    nice: true,
  })
  const barHeight = yScale.bandwidth()
  const worldAvgX = xScale(1)

  return (
    <svg
      width={width}
      height={height}
      role="img"
      aria-label="Ranking dos países que mais usam o Claude, normalizado pela população em idade ativa — índice 1.0 é a média mundial"
    >
      <Group left={margin.left} top={margin.top}>
        <line
          x1={worldAvgX}
          x2={worldAvgX}
          y1={0}
          y2={innerHeight}
          stroke={neutral[300]}
          strokeDasharray="3 2"
        />
        <text x={worldAvgX + 4} y={-2} fontSize={9} fill={neutral[500]}>
          média mundial
        </text>

        {data.map((d, i) => {
          const barY = yScale(d.country) ?? 0
          const barWidth = xScale(d.usagePerCapitaIndex)
          const isTop = i === 0
          return (
            <Group key={d.country} top={barY}>
              <text
                x={-8}
                y={barHeight / 2}
                dy=".35em"
                textAnchor="end"
                fontSize={fontSize}
                fontWeight={isTop ? 600 : 400}
                fill={isTop ? accent[700] : neutral[600]}
              >
                {truncateToWidth(d.country, margin.left - 16, fontSize)}
              </text>
              <motion.rect
                initial={{ width: 0 }}
                animate={{ width: barWidth }}
                transition={{ duration: 0.6, delay: i * 0.04, ease: 'easeOut' }}
                height={barHeight}
                rx={4}
                fill={isTop ? accent[500] : neutral[300]}
              />
              <text
                x={barWidth + 8}
                y={barHeight / 2}
                dy=".35em"
                fontSize={fontSize}
                fontWeight={isTop ? 600 : 400}
                fill={isTop ? accent[700] : neutral[600]}
              >
                {d.usagePerCapitaIndex.toFixed(1)}x
              </text>
            </Group>
          )
        })}
      </Group>

      <text x={width / 2} y={height - 6} textAnchor="middle" fontSize={10} fill={neutral[500]}>
        Brasil aparece na posição {BRAZIL_RANK} de {BRAZIL_TOTAL} — índice {BRAZIL_INDEX} (levemente
        abaixo da média mundial)
      </text>
    </svg>
  )
}

export function CountryUsageChart({ data }: { data: CountryUsageRow[] }) {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 && height > 0 ? <Chart data={data} width={width} height={height} /> : null
      }
    </ParentSize>
  )
}
