import { Group } from '@visx/group'
import { ParentSize } from '@visx/responsive'
import { scaleBand, scaleLog } from '@visx/scale'
import { motion } from 'framer-motion'

import { neutral, water } from '@/theme/palette'
import { estimateTextWidth } from '@/utils/text'
import type { WaterUseRankingRow } from '@/hooks/useWaterUseRanking'

type ChartProps = { data: WaterUseRankingRow[]; width: number; height: number }

function formatMgd(value: number) {
  return value.toLocaleString('pt-BR', { maximumFractionDigits: 1 })
}

function Chart({ data, width, height }: ChartProps) {
  const fontSize = width < 220 ? 9 : 11
  const captionHeight = 20

  const longestLabelWidth = Math.max(...data.map((d) => estimateTextWidth(d.dataCenter, fontSize)))
  const marginLeft = Math.min(Math.max(56, longestLabelWidth + 16), width * 0.5)
  const marginRight = Math.max(48, Math.min(64, width * 0.18))
  const margin = { top: 8, right: marginRight, bottom: 8, left: marginLeft }

  const innerWidth = Math.max(width - margin.left - margin.right, 0)
  const innerHeight = Math.max(height - margin.top - margin.bottom - captionHeight, 0)

  const yScale = scaleBand<string>({
    domain: data.map((d) => d.dataCenter),
    range: [0, innerHeight],
    padding: 0.3,
  })

  // Escala logarítmica: mesmo sem o outlier, os valores vão de 0,1 a
  // 21 MGD (~200x de diferença) — linear deixaria os menores invisíveis.
  const xScale = scaleLog<number>({
    domain: [
      Math.min(...data.map((d) => d.peakWaterMgd)) * 0.8,
      Math.max(...data.map((d) => d.peakWaterMgd)) * 1.2,
    ],
    range: [0, innerWidth],
  })

  const barHeight = yScale.bandwidth()
  const isTop = (i: number) => i === 0

  return (
    <svg
      width={width}
      height={height}
      role="img"
      aria-label="Ranking dos data centers de IA com maior uso de água registrado, escala logarítmica"
    >
      <Group left={margin.left} top={margin.top}>
        {data.map((d, i) => {
          const barY = yScale(d.dataCenter) ?? 0
          const barWidth = xScale(d.peakWaterMgd)
          const label = d.country ? `${d.dataCenter} (${d.country})` : d.dataCenter
          return (
            <Group key={d.dataCenter} top={barY}>
              <text
                x={-8}
                y={barHeight / 2}
                dy=".35em"
                textAnchor="end"
                fontSize={fontSize}
                fontWeight={isTop(i) ? 600 : 400}
                fill={isTop(i) ? water[700] : neutral[600]}
              >
                {label}
              </text>
              <motion.rect
                initial={{ width: 0 }}
                animate={{ width: barWidth }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: 'easeOut' }}
                height={barHeight}
                rx={4}
                fill={isTop(i) ? water[500] : water[300]}
              />
              <text
                x={barWidth + 8}
                y={barHeight / 2}
                dy=".35em"
                fontSize={fontSize}
                fontWeight={isTop(i) ? 600 : 400}
                fill={isTop(i) ? water[700] : neutral[600]}
              >
                {formatMgd(d.peakWaterMgd)} MGD
              </text>
            </Group>
          )
        })}
      </Group>

      <text
        x={width / 2}
        y={height - captionHeight + 14}
        textAnchor="middle"
        fontSize={10}
        fill={neutral[500]}
      >
        Escala logarítmica — cada intervalo representa 10x o anterior
      </text>
    </svg>
  )
}

export function WaterUseRankingChart({ data }: { data: WaterUseRankingRow[] }) {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 && height > 0 ? <Chart data={data} width={width} height={height} /> : null
      }
    </ParentSize>
  )
}
