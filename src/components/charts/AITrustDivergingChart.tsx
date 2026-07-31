import { Group } from '@visx/group'
import { ParentSize } from '@visx/responsive'
import { scaleLinear } from '@visx/scale'
import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import { truncateToWidth } from '@/utils/text'
import type { CategoryCount } from '@/types/data'

const ORDER: { category: string; label: string; side: 'distrust' | 'neutral' | 'trust' }[] = [
  { category: 'Highly distrust', label: 'Desconfia muito', side: 'distrust' },
  { category: 'Somewhat distrust', label: 'Desconfia um pouco', side: 'distrust' },
  { category: 'Neither trust nor distrust', label: 'Neutro', side: 'neutral' },
  { category: 'Somewhat trust', label: 'Confia um pouco', side: 'trust' },
  { category: 'Highly trust', label: 'Confia muito', side: 'trust' },
]

type ChartProps = { data: CategoryCount[]; width: number; height: number }

function Chart({ data, width, height }: ChartProps) {
  const total = data.reduce((s, d) => s + d.count, 0)
  const byCategory = new Map(data.map((d) => [d.category, d.count]))
  const fontSize = width < 260 ? 10 : 12

  const rows = ORDER.map((o) => {
    const count = byCategory.get(o.category) ?? 0
    const pct = (count / total) * 100
    const signed = o.side === 'distrust' ? -pct : o.side === 'trust' ? pct : 0
    return { ...o, count, pct, signed }
  })

  const distrustPct = Math.round(
    rows.filter((r) => r.side === 'distrust').reduce((s, r) => s + r.pct, 0),
  )
  const trustPct = Math.round(rows.filter((r) => r.side === 'trust').reduce((s, r) => s + r.pct, 0))

  const marginLeft = Math.max(90, Math.min(150, width * 0.35))
  const marginRight = Math.max(36, Math.min(56, width * 0.12))
  const legendHeight = 28
  const margin = { top: 8 + legendHeight, right: marginRight, bottom: 8, left: marginLeft }
  const innerWidth = Math.max(width - margin.left - margin.right, 0)
  const innerHeight = Math.max(height - margin.top - margin.bottom, 0)

  const maxAbs = Math.max(...rows.map((r) => Math.abs(r.signed)), 5)
  const xScale = scaleLinear<number>({ domain: [-maxAbs, maxAbs], range: [0, innerWidth] })
  const zeroX = xScale(0)
  const rowHeight = innerHeight / rows.length

  return (
    <svg
      width={width}
      height={height}
      role="img"
      aria-label="Confiança dos desenvolvedores na precisão do código gerado por IA: mais gente desconfia do que confia"
    >
      <text
        x={margin.left + zeroX / 2}
        y={margin.top - legendHeight / 2}
        dy=".35em"
        textAnchor="middle"
        fontSize={fontSize}
        fontWeight={600}
        fill={accent[700]}
      >
        ← Desconfia ({distrustPct}%)
      </text>
      <text
        x={margin.left + zeroX + (innerWidth - zeroX) / 2}
        y={margin.top - legendHeight / 2}
        dy=".35em"
        textAnchor="middle"
        fontSize={fontSize}
        fill={neutral[500]}
      >
        Confia ({trustPct}%) →
      </text>
      <Group left={margin.left} top={margin.top}>
        <line x1={zeroX} x2={zeroX} y1={0} y2={innerHeight} stroke={neutral[300]} strokeWidth={1} />
        {rows.map((r, i) => {
          const barY = i * rowHeight + rowHeight * 0.2
          const barHeight = rowHeight * 0.6
          const x1 = xScale(r.signed)
          // "Neutro" tem valor 0 por definição (nem confia nem desconfia) —
          // sem essa largura mínima a barra simplesmente some, parecendo bug.
          // Centralizada no próprio zeroX (2px pra cada lado).
          const isNeutralRow = r.side === 'neutral'
          const barX = isNeutralRow ? zeroX - 2 : Math.min(zeroX, x1)
          const barWidth = isNeutralRow ? 4 : Math.abs(x1 - zeroX)
          const isDistrust = r.side === 'distrust'
          const fill = isDistrust ? accent[500] : r.side === 'trust' ? neutral[300] : neutral[200]
          return (
            <Group key={r.category} top={barY}>
              <text
                x={-8}
                y={barHeight / 2}
                dy=".35em"
                textAnchor="end"
                fontSize={fontSize}
                fontWeight={isDistrust ? 600 : 400}
                fill={isDistrust ? accent[700] : neutral[600]}
              >
                {truncateToWidth(r.label, margin.left - 16, fontSize)}
              </text>
              <motion.rect
                initial={{ width: 0, x: zeroX }}
                animate={{ width: barWidth, x: barX }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: 'easeOut' }}
                height={barHeight}
                rx={3}
                fill={fill}
              />
              <text
                x={r.signed >= 0 ? x1 + 8 : x1 - 8}
                y={barHeight / 2}
                dy=".35em"
                textAnchor={r.signed >= 0 ? 'start' : 'end'}
                fontSize={fontSize}
                fontWeight={isDistrust ? 600 : 400}
                fill={isDistrust ? accent[700] : neutral[600]}
              >
                {Math.round(r.pct)}%
              </text>
            </Group>
          )
        })}
      </Group>
    </svg>
  )
}

export function AITrustDivergingChart({ data }: { data: CategoryCount[] }) {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 && height > 0 ? <Chart data={data} width={width} height={height} /> : null
      }
    </ParentSize>
  )
}
