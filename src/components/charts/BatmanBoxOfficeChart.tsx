import { Group } from '@visx/group'
import { ParentSize } from '@visx/responsive'
import { scaleBand, scaleLinear } from '@visx/scale'
import { TooltipWithBounds, useTooltip } from '@visx/tooltip'
import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import { formatUsd } from '@/utils/format'
import type { BatmanBoxOfficeRow } from '@/data/loaders/loadBatmanBoxOffice'

/**
 * Faixas oficiais do Tomatometer, não um degradê arbitrário: a RT trata 60%
 * como a fronteira entre podre e fresco, e 75% como o piso do selo
 * "certificado fresco". Codificar a cor por essas faixas faz o cinza virar
 * informação ("a crítica reprovou") em vez de só "tom mais escuro" — ver
 * docs/best-practices/atributos-pre-atentivos.md.
 */
const RT_BANDS = [
  {
    label: 'Podre',
    short: 'Podre',
    range: 'abaixo de 60% — tomate esmagado',
    color: neutral[500],
  },
  { label: 'Fresco', short: 'Fresco', range: '60% a 74% — tomate inteiro', color: accent[400] },
  {
    label: 'Certificado fresco',
    short: 'Certificado',
    range: '75% ou mais + volume mínimo de críticas',
    color: accent[600],
  },
] as const

function rtBand(score: number) {
  if (score < 60) return RT_BANDS[0]
  if (score < 75) return RT_BANDS[1]
  return RT_BANDS[2]
}

type ChartProps = {
  data: BatmanBoxOfficeRow[]
  width: number
  height: number
  compact?: boolean
}

function Chart({ data, width, height, compact = false }: ChartProps) {
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

  const barWidth = xScale.bandwidth()

  return (
    <div style={{ position: 'relative' }}>
      <svg
        width={width}
        height={height}
        role="img"
        aria-label="Bilheteria mundial de cada filme do Batman (1989-2022), colorida pela faixa da nota no Rotten Tomatoes: cinza para podre, dourado claro para fresco e dourado escuro para 75% ou mais"
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
                  fill={rtBand(d.rtScore).color}
                  stroke={isLowPoint ? neutral[900] : 'none'}
                  strokeWidth={isLowPoint ? 1.5 : 0}
                  style={{ cursor: 'pointer' }}
                  initial={{ y: innerHeight, height: 0 }}
                  animate={{ y: barY, height: barHeight }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
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

      {/* Só na apresentação: o espaço vazio acima das barras curtas dos anos
          90 cabe a explicação; no card do dashboard sobra só a tira de cores. */}
      {/* Cada linha entra com seu próprio atraso — título, depois a
          explicação, depois cada faixa de cor — em vez da caixa inteira
          aparecer de uma vez, que é mais dado pra digerir de golpe do que
          o resto da narrativa em volta. */}
      {!compact && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute rounded-md border bg-background/90 px-3 py-2 shadow-sm backdrop-blur-sm"
          style={{ left: margin.left, top: margin.top, maxWidth: 440 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-xs font-semibold"
          >
            Como ler a cor: o Tomatômetro
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.3 }}
            className="mt-1 text-[11px] leading-snug text-muted-foreground"
          >
            Não é uma nota de 0 a 10: é o percentual de críticos que aprovaram o filme. Cada
            crítica vale só "aprovou" ou "não aprovou", então 80% quer dizer 80 de cada 100 críticos
            positivos.
          </motion.p>
          <ul className="mt-2 space-y-1">
            {RT_BANDS.map((band, i) => (
              <motion.li
                key={band.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.14, duration: 0.3 }}
                className="flex items-center gap-2 text-[11px] whitespace-nowrap"
              >
                <span
                  className="size-3 shrink-0 rounded-sm"
                  style={{ backgroundColor: band.color }}
                />
                <span className="w-28 shrink-0 font-medium">{band.label}</span>
                <span className="text-muted-foreground">{band.range}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {tooltipOpen && tooltipData && (
        <TooltipWithBounds left={(tooltipLeft ?? 0) + 12} top={(tooltipTop ?? 0) + 12}>
          <div className="max-w-56 text-xs">
            <p className="font-semibold">
              {tooltipData.title} ({tooltipData.year})
            </p>
            <p className="mt-1">
              <span className="text-muted-foreground">Direção:</span> {tooltipData.director}
            </p>
            <p>
              <span className="text-muted-foreground">Batman:</span> {tooltipData.batmanActor}
            </p>
            {tooltipData.supportingCast.length > 0 && (
              <p>
                <span className="text-muted-foreground">Com:</span>{' '}
                {tooltipData.supportingCast.join(', ')}
              </p>
            )}
            <p className="mt-1">
              <span className="text-muted-foreground">Bilheteria mundial:</span>{' '}
              {formatUsd(tooltipData.worldwideGrossUsd)}
            </p>
            <p>
              <span className="text-muted-foreground">Custou:</span>{' '}
              {formatUsd(tooltipData.budgetUsd)}
            </p>
            <p>
              <span className="text-muted-foreground">Rendeu:</span>{' '}
              {(tooltipData.worldwideGrossUsd / tooltipData.budgetUsd).toLocaleString('pt-BR', {
                maximumFractionDigits: 1,
              })}
              x o orçamento
            </p>
            <p>
              <span className="text-muted-foreground">Rotten Tomatoes:</span>{' '}
              {tooltipData.rtScore}% — {rtBand(tooltipData.rtScore).label.toLowerCase()}
            </p>
          </div>
        </TooltipWithBounds>
      )}
    </div>
  )
}

export function BatmanBoxOfficeChart({
  data,
  compact = false,
}: {
  data: BatmanBoxOfficeRow[]
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

      {compact ? (
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground">
          <span>Tomatometer (% de críticos que aprovaram):</span>
          {RT_BANDS.map((band) => (
            <span key={band.label} className="flex items-center gap-1">
              <span className="size-2.5 rounded-sm" style={{ backgroundColor: band.color }} />
              {band.short}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-center text-xs text-muted-foreground">
          Altura da barra = bilheteria mundial. Passe o mouse pra ver direção, elenco e orçamento.
        </p>
      )}
    </div>
  )
}
