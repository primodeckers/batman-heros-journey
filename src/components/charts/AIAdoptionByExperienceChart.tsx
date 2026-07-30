import { Group } from '@visx/group'
import { ParentSize } from '@visx/responsive'
import { scaleBand, scaleLinear } from '@visx/scale'
import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import type { AIAdoptionByExperience } from '@/types/data'

type ChartProps = { data: AIAdoptionByExperience[]; width: number; height: number }

function Chart({ data, width, height }: ChartProps) {
  const fontSize = width < 260 ? 10 : 12
  const margin = { top: 24, right: 12, bottom: 32, left: 12 }
  const innerWidth = Math.max(width - margin.left - margin.right, 0)
  const innerHeight = Math.max(height - margin.top - margin.bottom, 0)

  const xScale = scaleBand<string>({
    domain: data.map((d) => d.experience),
    range: [0, innerWidth],
    padding: 0.35,
  })
  const yScale = scaleLinear<number>({ domain: [0, 100], range: [innerHeight, 0] })

  const barWidth = xScale.bandwidth()
  const lowest = Math.min(...data.map((d) => d.pct))

  return (
    <svg
      width={width}
      height={height}
      role="img"
      aria-label="Percentual de desenvolvedores que usam IA, por faixa de anos de experiência — quem tem 11 anos ou mais é quem menos usa"
    >
      <Group left={margin.left} top={margin.top}>
        {data.map((d, i) => {
          const barX = xScale(d.experience) ?? 0
          const barTop = yScale(d.pct)
          const barHeight = innerHeight - barTop
          const isLowest = d.pct === lowest
          return (
            <Group key={d.experience} left={barX}>
              <text
                x={barWidth / 2}
                y={barTop - 8}
                textAnchor="middle"
                fontSize={fontSize}
                fontWeight={isLowest ? 600 : 400}
                fill={isLowest ? accent[700] : neutral[600]}
              >
                {d.pct}%
              </text>
              <motion.rect
                y={innerHeight}
                width={barWidth}
                rx={4}
                fill={isLowest ? accent[500] : neutral[300]}
                initial={{ height: 0, y: innerHeight }}
                animate={{ height: barHeight, y: barTop }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
              />
              <text
                x={barWidth / 2}
                y={innerHeight + 18}
                textAnchor="middle"
                fontSize={fontSize}
                fill={neutral[600]}
              >
                {d.experience}
              </text>
            </Group>
          )
        })}
      </Group>
    </svg>
  )
}

export function AIAdoptionByExperienceChart({ data }: { data: AIAdoptionByExperience[] }) {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 && height > 0 ? <Chart data={data} width={width} height={height} /> : null
      }
    </ParentSize>
  )
}
