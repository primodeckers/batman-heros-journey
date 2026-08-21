import { useMemo, useState } from 'react'
import { Group } from '@visx/group'
import { ParentSize } from '@visx/responsive'
import { scaleBand, scaleLinear } from '@visx/scale'
import { TooltipWithBounds, useTooltip } from '@visx/tooltip'
import { motion } from 'framer-motion'
import { CalendarRange, DollarSign, Percent, Trophy, type LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { accent, neutral } from '@/theme/palette'
import { formatUsd, formatUsdCompact } from '@/utils/format'
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

type RtBandLabel = (typeof RT_BANDS)[number]['label']

/** `chronological` é o gráfico original (eixo = ano). `ranking` vira o
 * eixo e ordena da maior pra menor bilheteria — mesmo dado, pergunta
 * diferente ("quem faturou mais" em vez de "quando"). */
type Orientation = 'chronological' | 'ranking'

/** Opacidade da barra/rótulo quando uma faixa está em destaque e essa
 * barra não é dela — reduz saturação percebida sem apagar por completo
 * (ver docs/best-practices/cor-e-acessibilidade.md, seção 4). */
const DIMMED_OPACITY = 0.25

type ChartProps = {
  data: BatmanBoxOfficeRow[]
  width: number
  height: number
  compact?: boolean
  /** Rótulo numérico de bilheteria junto da barra — é o dado principal do
   * gráfico, então vem ligado por padrão. Controlado pelos ícones
   * discretos na própria legenda. */
  showGrossLabel?: boolean
  onToggleGrossLabel?: () => void
  /** Percentual do Rotten Tomatoes junto da barra — desligado por padrão
   * porque a cor da barra já codifica a faixa da nota; o número exato é
   * camada extra pra quem quiser. No modo compacto fica sempre visível
   * (lá não há controles). */
  showRtLabel?: boolean
  onToggleRtLabel?: () => void
  /** Rótulo do ano embaixo de cada barra. */
  showYearLabel?: boolean
  onToggleYearLabel?: () => void
  /** Faixas do Tomatômetro em destaque (clique na legenda, seleção
   * múltipla) — as barras de fora da seleção esmaecem, sem sumir, pra
   * manter a comparação possível entre duas faixas ao mesmo tempo. */
  highlightedBands?: RtBandLabel[]
  onToggleBand?: (label: RtBandLabel) => void
  /** Modo cronológico (padrão) vs. ranking horizontal por bilheteria. */
  orientation?: Orientation
  onToggleOrientation?: () => void
}

function Chart({
  data,
  width,
  height,
  compact = false,
  showGrossLabel = true,
  onToggleGrossLabel,
  showRtLabel = false,
  onToggleRtLabel,
  showYearLabel = true,
  onToggleYearLabel,
  highlightedBands = [],
  onToggleBand,
  orientation = 'chronological',
  onToggleOrientation,
}: ChartProps) {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } =
    useTooltip<BatmanBoxOfficeRow>()

  const isRanking = orientation === 'ranking'
  // No compacto a % é o único rótulo e não há controles, então fica fixa.
  const rtLabelVisible = compact || showRtLabel

  // Ranking não precisa do respiro de cima pro rótulo de bilheteria (ele
  // aparece do lado da barra, não em cima), mas precisa de margem lateral
  // pra caber o ano à esquerda e o valor/nota à direita de cada barra.
  // No cronológico, o topo só precisa de 14px extras quando bilheteria e
  // % estão ligadas ao mesmo tempo (duas linhas empilhadas em cima da barra).
  const margin = isRanking
    ? { top: 8, right: 92, bottom: 8, left: 44 }
    : {
        top: !compact && showGrossLabel && rtLabelVisible ? 46 : 32,
        right: 16,
        bottom: 32,
        left: 16,
      }
  const innerWidth = Math.max(width - margin.left - margin.right, 0)
  const innerHeight = Math.max(height - margin.top - margin.bottom, 0)

  const maxGross = Math.max(...data.map((d) => d.worldwideGrossUsd))

  const chronoX = scaleBand<number>({
    domain: data.map((d) => d.year),
    range: [0, innerWidth],
    padding: 0.3,
  })
  const chronoY = scaleLinear<number>({
    domain: [0, maxGross],
    range: [innerHeight, 0],
    nice: true,
  })

  // Reordena pela bilheteria (maior pro menor) só pra decidir a posição de
  // cada linha no ranking — os dados em si não mudam de ordem no array.
  const rankedYears = useMemo(
    () => [...data].sort((a, b) => b.worldwideGrossUsd - a.worldwideGrossUsd).map((d) => d.year),
    [data],
  )
  const rankY = scaleBand<number>({
    domain: rankedYears,
    range: [0, innerHeight],
    padding: 0.28,
  })
  const rankX = scaleLinear<number>({
    domain: [0, maxGross],
    range: [0, innerWidth],
    nice: true,
  })

  const barTransition = {
    x: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    y: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    width: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    height: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    opacity: { duration: 0.35, ease: 'easeOut' },
  } as const

  return (
    <div style={{ position: 'relative' }}>
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={
          isRanking
            ? 'Ranking dos filmes do Batman por bilheteria mundial, do maior pro menor, colorido pela faixa do Rotten Tomatoes'
            : 'Bilheteria mundial de cada filme do Batman (1989-2022), colorida pela faixa da nota no Rotten Tomatoes: cinza para podre, dourado claro para fresco e dourado escuro para 75% ou mais'
        }
      >
        <Group left={margin.left} top={margin.top}>
          {data.map((d) => {
            const isLowPoint = d.title === 'Batman & Robin'
            const isDimmed =
              highlightedBands.length > 0 && !highlightedBands.includes(rtBand(d.rtScore).label)
            const labelOpacity = isDimmed ? DIMMED_OPACITY : 1

            const chronoBarWidth = chronoX.bandwidth()
            const chronoBarX = chronoX(d.year) ?? 0
            const chronoBarY = chronoY(d.worldwideGrossUsd)
            const chronoBarHeight = innerHeight - chronoBarY

            const rankBarHeight = rankY.bandwidth()
            const rankBarY = rankY(d.year) ?? 0
            const rankBarWidth = rankX(d.worldwideGrossUsd)

            // Só o alvo muda com o modo — como o rect não é desmontado, o
            // framer-motion interpola sozinho da posição/tamanho anterior
            // pro novo, e é isso que dá o efeito de barras "se reorganizando".
            const rectTarget = isRanking
              ? { x: 0, y: rankBarY, width: rankBarWidth, height: rankBarHeight }
              : { x: chronoBarX, y: chronoBarY, width: chronoBarWidth, height: chronoBarHeight }

            return (
              <motion.rect
                key={d.year}
                rx={3}
                fill={rtBand(d.rtScore).color}
                stroke={isLowPoint ? neutral[900] : 'none'}
                strokeWidth={isLowPoint ? 1.5 : 0}
                style={{ cursor: 'pointer' }}
                initial={{ x: chronoBarX, y: innerHeight, width: chronoBarWidth, height: 0, opacity: 1 }}
                animate={{ ...rectTarget, opacity: labelOpacity }}
                transition={barTransition}
                // Clicar na própria barra é o mesmo controle da legenda: destaca
                // o grupo (faixa do Tomatômetro) daquela barra, sem duplicar a
                // lógica de seleção.
                onClick={() => onToggleBand?.(rtBand(d.rtScore).label)}
                onMouseMove={(e) => {
                  // Com uma faixa em destaque, o tooltip vira parte da seleção:
                  // só as barras do grupo escolhido respondem ao hover — as
                  // esmaecidas ficam "desligadas" pra reforçar visualmente
                  // qual comparação está ativa.
                  if (isDimmed) {
                    hideTooltip()
                    return
                  }
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

          {/* Rótulos formam um grupo próprio, separado das barras: eles somem
              rápido na virada de modo e reaparecem já na posição nova, um
              instante depois das barras terminarem de se reorganizar — em vez
              de tentar acompanhar o "voo" de cada barra, o que ficaria poluído
              com texto girando pela tela. */}
          <motion.g
            key={orientation}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.35, ease: 'easeOut' }}
          >
            {data.map((d) => {
              const isDimmed =
                highlightedBands.length > 0 && !highlightedBands.includes(rtBand(d.rtScore).label)
              const labelOpacity = isDimmed ? DIMMED_OPACITY : 1

              if (isRanking) {
                const barY = rankY(d.year) ?? 0
                const barHeight = rankY.bandwidth()
                const barWidth = rankX(d.worldwideGrossUsd)
                const centerY = barY + barHeight / 2
                const valueParts = [
                  showGrossLabel ? formatUsdCompact(d.worldwideGrossUsd) : null,
                  rtLabelVisible ? `${d.rtScore}%` : null,
                ].filter(Boolean)
                return (
                  <Group key={d.year}>
                    {showYearLabel && (
                      <text
                        x={-8}
                        y={centerY}
                        textAnchor="end"
                        dominantBaseline="middle"
                        fontSize={10}
                        fill={neutral[600]}
                        opacity={labelOpacity}
                      >
                        {d.year}
                      </text>
                    )}
                    {valueParts.length > 0 && (
                      <text
                        x={barWidth + 8}
                        y={centerY}
                        textAnchor="start"
                        dominantBaseline="middle"
                        fontSize={10}
                        fontWeight={600}
                        fill={neutral[700]}
                        opacity={labelOpacity}
                      >
                        {valueParts.join(' · ')}
                      </text>
                    )}
                  </Group>
                )
              }

              const barWidth = chronoX.bandwidth()
              const barCenterX = (chronoX(d.year) ?? 0) + barWidth / 2
              const barY = chronoY(d.worldwideGrossUsd)
              return (
                <Group key={d.year}>
                  {/* Quando bilheteria e % estão ligadas juntas, empilham em
                      duas linhas (bilheteria em cima); sozinho, cada rótulo
                      ocupa a linha mais próxima da barra. */}
                  {!compact && showGrossLabel && (
                    <text
                      x={barCenterX}
                      y={rtLabelVisible ? barY - 20 : barY - 8}
                      textAnchor="middle"
                      fontSize={10}
                      fontWeight={600}
                      fill={accent[700]}
                      opacity={labelOpacity}
                    >
                      {formatUsdCompact(d.worldwideGrossUsd)}
                    </text>
                  )}
                  {rtLabelVisible && (
                    <text
                      x={barCenterX}
                      y={barY - 8}
                      textAnchor="middle"
                      fontSize={10}
                      fontWeight={600}
                      fill={neutral[700]}
                      opacity={labelOpacity}
                    >
                      {d.rtScore}%
                    </text>
                  )}
                  {showYearLabel && (
                    <text
                      x={barCenterX}
                      y={innerHeight + 18}
                      textAnchor="middle"
                      fontSize={10}
                      fill={neutral[600]}
                      opacity={labelOpacity}
                    >
                      {d.year}
                    </text>
                  )}
                </Group>
              )
            })}
          </motion.g>
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
          // Remonta ao trocar de modo: a caixa esconde rápido e só reaparece
          // no canto novo depois que as barras já se reorganizaram, em vez
          // de saltar de canto no meio da animação. No modo cronológico ela
          // mora no vazio acima das barras curtas dos anos 90; no ranking
          // esse vazio migra pro canto inferior direito (onde ficam as
          // barras mais curtas), então a caixa migra com ele.
          key={orientation}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="absolute rounded-md border bg-background/90 px-3 py-2 shadow-sm backdrop-blur-sm"
          style={
            isRanking
              ? { right: margin.right, bottom: margin.bottom, maxWidth: 480 }
              : { left: margin.left, top: margin.top, maxWidth: 480 }
          }
        >
          <div className="flex items-center justify-between gap-2">
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="text-xs font-semibold"
            >
              Como ler a cor: o Tomatômetro
            </motion.p>
            {/* Discretos e só com ícone de propósito: são um extra pra quem
                quer customizar, não o dado principal — não podem competir
                com o título da legenda. O botão de ranking é o único com
                texto porque troca o gráfico inteiro de forma, não só liga
                uma camada — merece mais destaque que os ícones ao lado. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="flex shrink-0 items-center gap-1"
            >
              <div className="flex items-center gap-0.5">
                <LegendIconToggle
                  active={showGrossLabel}
                  onClick={onToggleGrossLabel}
                  icon={DollarSign}
                  label="bilheteria junto da barra"
                />
                <LegendIconToggle
                  active={showRtLabel}
                  onClick={onToggleRtLabel}
                  icon={Percent}
                  label="percentual do Rotten Tomatoes junto da barra"
                />
                <LegendIconToggle
                  active={showYearLabel}
                  onClick={onToggleYearLabel}
                  icon={CalendarRange}
                  label="ano embaixo da barra"
                />
              </div>
              <span className="h-3.5 w-px bg-border" aria-hidden="true" />
              <button
                type="button"
                onClick={onToggleOrientation}
                aria-pressed={isRanking}
                title={isRanking ? 'Voltar pra linha do tempo' : 'Ver como ranking, ordenado pela bilheteria'}
                className={cn(
                  'flex cursor-pointer items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium transition',
                  isRanking ? '' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
                style={isRanking ? { backgroundColor: accent[100], color: accent[700] } : undefined}
              >
                <Trophy className="size-3" />
                {isRanking ? 'Ranking' : 'Linha do tempo'}
              </button>
            </motion.div>
          </div>
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
          <ul className="mt-2 space-y-0.5">
            {RT_BANDS.map((band, i) => {
              const isSelected = highlightedBands.includes(band.label)
              const isOtherSelected = highlightedBands.length > 0 && !isSelected
              return (
                <motion.li
                  key={band.label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.14, duration: 0.3 }}
                >
                  <button
                    type="button"
                    onClick={() => onToggleBand?.(band.label)}
                    aria-pressed={isSelected}
                    aria-label={`Destacar a faixa "${band.label}" no gráfico`}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-sm px-1 py-0.5 text-left text-[11px] whitespace-nowrap transition',
                      'cursor-pointer hover:bg-muted',
                      isOtherSelected && 'opacity-45',
                    )}
                    style={isSelected ? { backgroundColor: accent[50] } : undefined}
                  >
                    <span
                      className="size-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: band.color,
                        boxShadow: isSelected ? `0 0 0 2px ${accent[400]}` : undefined,
                      }}
                    />
                    <span className="w-28 shrink-0 font-medium">{band.label}</span>
                    <span className="text-muted-foreground">{band.range}</span>
                  </button>
                </motion.li>
              )
            })}
          </ul>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + RT_BANDS.length * 0.14, duration: 0.3 }}
            className="mt-1.5 text-[10px] text-muted-foreground/80"
          >
            Clique numa ou mais faixas pra destacar só elas no gráfico.
          </motion.p>
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

/**
 * Botão discreto só com ícone, colado no cabeçalho da legenda — liga/desliga
 * uma camada opcional do gráfico. Não tem rótulo de texto de propósito (é
 * um extra de customização, não o dado principal), mas `title`/`aria-label`
 * cobrem a affordance escondida (docs/best-practices/affordances-visuais.md,
 * regra 4), e o estado ativo usa o accent pra ficar visualmente distinto.
 */
function LegendIconToggle({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean
  onClick?: () => void
  icon: LucideIcon
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={`${active ? 'Ocultar' : 'Mostrar'} ${label}`}
      title={`${active ? 'Ocultar' : 'Mostrar'} ${label}`}
      className={cn(
        'flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-sm transition',
        active ? '' : 'text-muted-foreground/70 hover:bg-muted hover:text-foreground',
      )}
      style={active ? { backgroundColor: accent[100], color: accent[700] } : undefined}
    >
      <Icon className="size-3" />
    </button>
  )
}

export function BatmanBoxOfficeChart({
  data,
  compact = false,
}: {
  data: BatmanBoxOfficeRow[]
  compact?: boolean
}) {
  // A visualização de como ler o gráfico fica a critério de quem está
  // vendo: cada camada opcional (bilheteria, ano) liga/desliga por conta
  // própria, e a legenda funciona como filtro — dá pra isolar uma ou duas
  // faixas ao mesmo tempo, pra comparar entre si.
  const [showGrossLabel, setShowGrossLabel] = useState(true)
  const [showRtLabel, setShowRtLabel] = useState(false)
  const [showYearLabel, setShowYearLabel] = useState(true)
  const [highlightedBands, setHighlightedBands] = useState<RtBandLabel[]>([])
  const [orientation, setOrientation] = useState<Orientation>('chronological')

  return (
    <div className="flex h-full flex-col gap-2">
      <div style={{ flex: 1, minHeight: 0 }}>
        <ParentSize>
          {({ width, height }) =>
            width > 0 && height > 0 ? (
              <Chart
                data={data}
                width={width}
                height={height}
                compact={compact}
                showGrossLabel={showGrossLabel}
                onToggleGrossLabel={() => setShowGrossLabel((v) => !v)}
                showRtLabel={showRtLabel}
                onToggleRtLabel={() => setShowRtLabel((v) => !v)}
                showYearLabel={showYearLabel}
                onToggleYearLabel={() => setShowYearLabel((v) => !v)}
                highlightedBands={highlightedBands}
                onToggleBand={(label) =>
                  setHighlightedBands((current) =>
                    current.includes(label) ? current.filter((l) => l !== label) : [...current, label],
                  )
                }
                orientation={orientation}
                onToggleOrientation={() =>
                  setOrientation((current) => (current === 'ranking' ? 'chronological' : 'ranking'))
                }
              />
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
          {orientation === 'ranking' ? 'Comprimento da barra' : 'Altura da barra'} = bilheteria
          mundial. Passe o mouse pra ver direção, elenco e orçamento. Clique numa barra pra
          destacar seu grupo do Tomatômetro.
        </p>
      )}
    </div>
  )
}
