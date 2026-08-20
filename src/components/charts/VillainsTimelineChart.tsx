import { Group } from '@visx/group'
import { LinePath } from '@visx/shape'
import { ParentSize } from '@visx/responsive'
import { scalePoint, scaleLinear } from '@visx/scale'
import { TooltipWithBounds, useTooltip } from '@visx/tooltip'
import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import { truncateToWidth } from '@/utils/text'
import type { VillainRow } from '@/data/loaders/loadBatmanVillains'

type ChartProps = { data: VillainRow[]; width: number; height: number; compact?: boolean }

function Chart({ data, width, height, compact = false }: ChartProps) {
  const villainNames = Array.from(new Set(data.map((d) => d.villain)))
  const countByVillain = new Map<string, number>()
  for (const d of data) countByVillain.set(d.villain, (countByVillain.get(d.villain) ?? 0) + 1)

  const labelFontSize = compact ? 10 : 11
  const margin = { top: 8, right: 16, bottom: 24, left: compact ? 78 : 108 }
  const innerWidth = Math.max(width - margin.left - margin.right, 0)
  const innerHeight = Math.max(height - margin.top - margin.bottom, 0)

  const years = data.map((d) => d.year)
  const yScale = scalePoint<string>({
    domain: villainNames,
    range: [0, innerHeight],
    padding: 0.5,
  })
  const xScale = scaleLinear<number>({
    domain: [Math.min(...years) - 2, Math.max(...years) + 2],
    range: [0, innerWidth],
  })

  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } =
    useTooltip<VillainRow>()

  return (
    <div style={{ position: 'relative' }}>
      <svg
        width={width}
        height={height}
        role="img"
        aria-label="Linha do tempo dos vilões do Batman no cinema — Coringa, Duas-Caras e Charada voltam mais de uma vez"
      >
        <Group left={margin.left} top={margin.top}>
          {villainNames.map((name) => {
            const y = yScale(name) ?? 0
            const isRecurring = (countByVillain.get(name) ?? 0) > 1
            return (
              <Group key={name}>
                <text
                  x={-8}
                  y={y}
                  dy=".35em"
                  textAnchor="end"
                  fontSize={labelFontSize}
                  fontWeight={isRecurring ? 600 : 400}
                  fill={isRecurring ? accent[700] : neutral[600]}
                >
                  {truncateToWidth(name, margin.left - 16, labelFontSize)}
                </text>
                <line
                  x1={0}
                  x2={innerWidth}
                  y1={y}
                  y2={y}
                  stroke={neutral[100]}
                  strokeWidth={1}
                />
              </Group>
            )
          })}

          {villainNames
            .filter((name) => (countByVillain.get(name) ?? 0) > 1)
            .map((name) => {
              const rows = data.filter((d) => d.villain === name)
              const y = yScale(name) ?? 0
              return (
                <LinePath
                  key={name}
                  data={rows}
                  x={(d) => xScale(d.year)}
                  y={() => y}
                  stroke={accent[400]}
                  strokeWidth={2}
                  strokeDasharray="4,3"
                />
              )
            })}

          {data.map((d, i) => {
            const cx = xScale(d.year)
            const cy = yScale(d.villain) ?? 0
            const isRecurring = (countByVillain.get(d.villain) ?? 0) > 1
            return (
              <motion.circle
                key={`${d.villain}-${d.year}`}
                cx={cx}
                cy={cy}
                r={compact ? 4.5 : 6}
                fill={isRecurring ? accent[500] : neutral[400]}
                stroke="white"
                strokeWidth={1.5}
                style={{ cursor: 'pointer' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onMouseMove={(e) => {
                  const svgRect = e.currentTarget.ownerSVGElement?.getBoundingClientRect()
                  showTooltip({
                    tooltipData: d,
                    tooltipLeft: e.clientX - (svgRect?.left ?? 0),
                    tooltipTop: e.clientY - (svgRect?.top ?? 0),
                  })
                }}
                onMouseLeave={hideTooltip}
              />
            )
          })}
        </Group>
      </svg>

      {tooltipOpen && tooltipData && (
        <TooltipWithBounds left={(tooltipLeft ?? 0) + 12} top={(tooltipTop ?? 0) + 12}>
          <div className="text-xs">
            <p className="font-semibold">
              {tooltipData.villain} ({tooltipData.year})
            </p>
            <p>{tooltipData.title}</p>
            <p>Interpretado por {tooltipData.actor}</p>
          </div>
        </TooltipWithBounds>
      )}
    </div>
  )
}

export function VillainsTimelineChart({
  data,
  compact = false,
}: {
  data: VillainRow[]
  compact?: boolean
}) {
  return (
    <div className="flex h-full flex-col gap-2">
      <div style={{ flex: 1, minHeight: 0 }}>
        <ParentSize>
          {({ width, height }) =>
            width > 0 && height > 0 ? (
              <Chart data={data} width={width} height={height} compact={compact} />
            ) : null
          }
        </ParentSize>
      </div>
      <p className={`text-center text-muted-foreground ${compact ? 'text-[11px]' : 'text-xs'}`}>
        {compact
          ? 'Pontos dourados e conectados = vilão que voltou mais de uma vez.'
          : 'Pontos dourados e conectados = vilão que voltou mais de uma vez. Passe o mouse pra ver o filme e o ator.'}
      </p>
    </div>
  )
}
