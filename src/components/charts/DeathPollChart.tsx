import { Group } from '@visx/group'
import { ParentSize } from '@visx/responsive'
import { scaleBand, scaleLinear } from '@visx/scale'
import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import { truncateToWidth } from '@/utils/text'
import type { DeathPollRow } from '@/data/loaders/loadDeathPoll'

type ChartProps = { data: DeathPollRow[]; width: number; height: number }

function Chart({ data, width, height }: ChartProps) {
  const margin = { top: 8, right: 56, bottom: 8, left: 8 }
  const innerWidth = Math.max(width - margin.left - margin.right, 0)
  const innerHeight = Math.max(height - margin.top - margin.bottom, 0)

  const yScale = scaleBand<string>({
    domain: data.map((d) => d.outcome),
    range: [0, innerHeight],
    padding: 0.35,
  })
  const xScale = scaleLinear<number>({
    domain: [0, Math.max(...data.map((d) => d.votes))],
    range: [0, innerWidth],
    nice: true,
  })

  const barHeight = yScale.bandwidth()
  const winner = data.reduce((a, b) => (b.votes > a.votes ? b : a))

  return (
    <svg
      width={width}
      height={height}
      role="img"
      aria-label="Votos na enquete de 1988 sobre a morte do Robin (Jason Todd): 5.343 a favor, 5.271 contra"
    >
      <Group left={margin.left} top={margin.top}>
        {data.map((d, i) => {
          const barY = yScale(d.outcome) ?? 0
          const barWidth = xScale(d.votes)
          const isWinner = d.outcome === winner.outcome
          return (
            <Group key={d.outcome} top={barY}>
              <text
                x={4}
                y={barHeight / 2 - 6}
                dy=".35em"
                fontSize={11}
                fontWeight={isWinner ? 600 : 400}
                fill={isWinner ? accent[800] : neutral[600]}
              >
                {truncateToWidth(d.outcome, innerWidth - 8, 11)}
              </text>
              <motion.rect
                y={12}
                initial={{ width: 0 }}
                animate={{ width: barWidth }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
                height={barHeight - 12}
                rx={4}
                fill={isWinner ? accent[500] : neutral[300]}
              />
              <text
                x={barWidth + 8}
                y={12 + (barHeight - 12) / 2}
                dy=".35em"
                fontSize={12}
                fontWeight={600}
                fill={isWinner ? accent[800] : neutral[600]}
              >
                {d.votes.toLocaleString('pt-BR')}
              </text>
            </Group>
          )
        })}
      </Group>
    </svg>
  )
}

export function DeathPollChart({ data }: { data: DeathPollRow[] }) {
  const margin = Math.abs(data[0].votes - data[1].votes)
  return (
    <div className="flex h-full flex-col gap-2">
      <div style={{ flex: 1, minHeight: 0 }}>
        <ParentSize>
          {({ width, height }) =>
            width > 0 && height > 0 ? <Chart data={data} width={width} height={height} /> : null
          }
        </ParentSize>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Margem de apenas {margin} votos, entre 10.614 ligações feitas em 36 horas (set/1988) — os
        fãs escolheram matar o Robin.
      </p>
    </div>
  )
}
