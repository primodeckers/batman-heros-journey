import { Group } from '@visx/group'
import { ParentSize } from '@visx/responsive'
import { scaleBand, scaleLinear } from '@visx/scale'
import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import { truncateToWidth } from '@/utils/text'
import type { ToolComparisonRow } from '@/types/data'

type ChartProps = { data: ToolComparisonRow[]; width: number; height: number }

function Chart({ data, width, height }: ChartProps) {
  const sorted = [...data].sort((a, b) => b.commitsPct - a.commitsPct)
  const fontSize = width < 260 ? 9 : 11

  const marginLeft = Math.max(70, Math.min(140, width * 0.32))
  const marginRight = Math.max(90, Math.min(140, width * 0.28))
  const margin = { top: 8, right: marginRight, bottom: 8, left: marginLeft }
  const innerWidth = Math.max(width - margin.left - margin.right, 0)
  const innerHeight = Math.max(height - margin.top - margin.bottom, 0)

  const yScale = scaleBand<string>({
    domain: sorted.map((d) => d.tool),
    range: [0, innerHeight],
    padding: 0.3,
  })
  const xScale = scaleLinear<number>({
    domain: [0, Math.max(...sorted.map((d) => d.commitsPct))],
    range: [0, innerWidth],
    nice: true,
  })
  const barHeight = yScale.bandwidth()

  return (
    <svg
      width={width}
      height={height}
      role="img"
      aria-label="Comparação do ganho de commits por ferramenta de IA específica, com o ganho em releases entre parênteses quando disponível"
    >
      <Group left={margin.left} top={margin.top}>
        {sorted.map((d, i) => {
          const barY = yScale(d.tool) ?? 0
          const barWidth = xScale(d.commitsPct)
          const isTop = i === 0
          return (
            <Group key={d.tool} top={barY}>
              <text
                x={-8}
                y={barHeight / 2}
                dy=".35em"
                textAnchor="end"
                fontSize={fontSize}
                fontWeight={isTop ? 600 : 400}
                fill={isTop ? accent[700] : neutral[600]}
              >
                {truncateToWidth(d.tool, margin.left - 16, fontSize)}
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
                fontSize={fontSize}
                fontWeight={isTop ? 600 : 400}
                fill={isTop ? accent[700] : neutral[600]}
              >
                +{Math.round(d.commitsPct)}% commits
                {d.releasesPct !== null && ` · +${Math.round(d.releasesPct)}% releases`}
              </text>
            </Group>
          )
        })}
      </Group>
    </svg>
  )
}

export function ToolComparisonChart({ data }: { data: ToolComparisonRow[] }) {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 && height > 0 ? <Chart data={data} width={width} height={height} /> : null
      }
    </ParentSize>
  )
}
