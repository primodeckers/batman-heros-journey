import { Group } from '@visx/group'
import { ParentSize } from '@visx/responsive'
import { scaleBand, scaleLinear, scaleQuantize } from '@visx/scale'
import { TooltipWithBounds, useTooltip } from '@visx/tooltip'
import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import type { BatmanBoxOfficeRow } from '@/data/loaders/loadBatmanBoxOffice'

function formatUsd(v: number) {
  return `US$ ${(v / 1_000_000).toFixed(0)} mi`
}

type ChartProps = { data: BatmanBoxOfficeRow[]; width: number; height: number }

function Chart({ data, width, height }: ChartProps) {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } =
    useTooltip<BatmanBoxOfficeRow>()

  const margin = { top: 32, right: 16, bottom: 32, left: 16 }
  const innerWidth = Math.max(width - margin.left - margin.right, 0)
  const innerHeight = Math.max(height - margin.top - margin.bottom, 0)

  const xScale = scaleBand<number>({
    domain: data.map((d) => d.year),
    range: [0, innerWidth],
    padding: 0.3,
  })
  const yScale = scaleLinear<number>({
    domain: [0, Math.max(...data.map((d) => d.worldwideGrossUsd))],
    range: [innerHeight, 0],
    nice: true,
  })
  const colorScale = scaleQuantize<string>({
    domain: [0, 100],
    range: [neutral[600], neutral[400], accent[300], accent[400], accent[500], accent[600]],
  })

  const barWidth = xScale.bandwidth()

  return (
    <div style={{ position: 'relative' }}>
      <svg
        width={width}
        height={height}
        role="img"
        aria-label="Bilheteria mundial de cada filme do Batman (1989-2022), colorida pela nota no Rotten Tomatoes"
      >
        <Group left={margin.left} top={margin.top}>
          {data.map((d) => {
            const barHeight = innerHeight - yScale(d.worldwideGrossUsd)
            const barX = xScale(d.year) ?? 0
            const barY = yScale(d.worldwideGrossUsd)
            const isLowPoint = d.title === 'Batman & Robin'
            return (
              <Group key={d.year}>
                <motion.rect
                  x={barX}
                  width={barWidth}
                  rx={3}
                  fill={colorScale(d.rtScore)}
                  stroke={isLowPoint ? neutral[900] : 'none'}
                  strokeWidth={isLowPoint ? 1.5 : 0}
                  style={{ cursor: 'pointer' }}
                  initial={{ y: innerHeight, height: 0 }}
                  animate={{ y: barY, height: barHeight }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  onMouseMove={(e) =>
                    showTooltip({ tooltipData: d, tooltipLeft: e.clientX, tooltipTop: e.clientY })
                  }
                  onMouseLeave={hideTooltip}
                />
                <text
                  x={barX + barWidth / 2}
                  y={barY - 8}
                  textAnchor="middle"
                  fontSize={10}
                  fontWeight={600}
                  fill={neutral[700]}
                >
                  {d.rtScore}%
                </text>
                <text
                  x={barX + barWidth / 2}
                  y={innerHeight + 18}
                  textAnchor="middle"
                  fontSize={10}
                  fill={neutral[600]}
                >
                  {d.year}
                </text>
              </Group>
            )
          })}
        </Group>
      </svg>

      {tooltipOpen && tooltipData && (
        <TooltipWithBounds left={tooltipLeft} top={tooltipTop} style={{ position: 'fixed' }}>
          <div className="text-xs">
            <p className="font-semibold">{tooltipData.title}</p>
            <p>Bilheteria mundial: {formatUsd(tooltipData.worldwideGrossUsd)}</p>
            <p>Orçamento: {formatUsd(tooltipData.budgetUsd)}</p>
            <p>Rotten Tomatoes: {tooltipData.rtScore}%</p>
          </div>
        </TooltipWithBounds>
      )}
    </div>
  )
}

export function BatmanBoxOfficeChart({ data }: { data: BatmanBoxOfficeRow[] }) {
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
        Altura = bilheteria mundial · cor = nota no Rotten Tomatoes (cinza-escuro = ruim, dourado =
        aclamado). Passe o mouse pra ver orçamento e título completo.
      </p>
    </div>
  )
}
