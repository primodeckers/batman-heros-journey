import { useState } from 'react'
import { Group } from '@visx/group'
import { ParentSize } from '@visx/responsive'
import { scaleLinear, scalePoint } from '@visx/scale'
import { TooltipWithBounds, useTooltip } from '@visx/tooltip'
import { motion } from 'framer-motion'
import { CalendarRange, Clapperboard } from 'lucide-react'

import { cn } from '@/lib/utils'
import { accent, neutral } from '@/theme/palette'
import { truncateToWidth } from '@/utils/text'
import type { VillainRow } from '@/data/loaders/loadBatmanVillains'

/** `villain` é a linha do tempo original (um vilão por linha). `film` vira
 * o eixo: um filme por linha, com seus vilões enfileirados — mesmo dado,
 * pergunta diferente ("quais filmes empilharam vilões" em vez de "quem
 * voltou"). */
type Mode = 'villain' | 'film'

/** Mesma dessaturação usada no gráfico de bilheteria (cor-e-acessibilidade,
 * seção 4): quem está fora da seleção esmaece, mas não some. */
const DIMMED_OPACITY = 0.25

const MOVE = { duration: 0.6, ease: [0.22, 1, 0.36, 1] } as const

type ChartProps = {
  data: VillainRow[]
  width: number
  height: number
  compact?: boolean
  mode?: Mode
  /** Anos embaixo do gráfico — só faz sentido no modo vilão, onde o eixo
   * horizontal é tempo. */
  showYearAxis?: boolean
  /** Vilões destacados (clique no nome, no ponto ou na legenda) — seleção
   * múltipla; os de fora esmaecem e perdem o tooltip, como no gráfico de
   * bilheteria. */
  selectedVillains?: string[]
  onToggleVillain?: (name: string) => void
}

function Chart({
  data,
  width,
  height,
  compact = false,
  mode = 'villain',
  showYearAxis = true,
  selectedVillains = [],
  onToggleVillain,
}: ChartProps) {
  const isFilmMode = mode === 'film'

  const villainNames = Array.from(new Set(data.map((d) => d.villain)))
  const countByVillain = new Map<string, number>()
  for (const d of data) countByVillain.set(d.villain, (countByVillain.get(d.villain) ?? 0) + 1)

  // Filmes em ordem cronológica (o CSV já vem ordenado por ano).
  const filmTitles: string[] = []
  for (const d of data) if (!filmTitles.includes(d.title)) filmTitles.push(d.title)
  const yearByTitle = new Map(data.map((d) => [d.title, d.year]))

  // Posição do vilão dentro do próprio filme (0 = primeiro listado).
  const slotByRow = new Map<VillainRow, number>()
  const seenPerFilm = new Map<string, number>()
  for (const d of data) {
    const slot = seenPerFilm.get(d.title) ?? 0
    slotByRow.set(d, slot)
    seenPerFilm.set(d.title, slot + 1)
  }

  const labelFontSize = compact ? 10 : 11
  const margin = isFilmMode
    ? { top: 8, right: 16, bottom: 8, left: 150 }
    : {
        top: 8,
        right: 16,
        bottom: showYearAxis ? 24 : 8,
        left: compact ? 78 : 108,
      }
  const innerWidth = Math.max(width - margin.left - margin.right, 0)
  const innerHeight = Math.max(height - margin.top - margin.bottom, 0)

  const years = data.map((d) => d.year)
  const villainY = scalePoint<string>({
    domain: villainNames,
    range: [0, innerHeight],
    padding: 0.5,
  })
  const yearX = scaleLinear<number>({
    domain: [Math.min(...years) - 2, Math.max(...years) + 2],
    range: [0, innerWidth],
  })
  const filmY = scalePoint<string>({
    domain: filmTitles,
    range: [0, innerHeight],
    padding: 0.5,
  })
  // No modo filme os vilões ficam enfileirados perto do rótulo, agrupados —
  // espaço fixo entre eles, com folga pro nome ao lado de cada ponto.
  const slotSpacing = Math.min(190, innerWidth / 2.6)

  const dotPosition = (d: VillainRow) =>
    isFilmMode
      ? { cx: 14 + (slotByRow.get(d) ?? 0) * slotSpacing, cy: filmY(d.title) ?? 0 }
      : { cx: yearX(d.year), cy: villainY(d.villain) ?? 0 }

  const isDimmed = (villain: string) =>
    selectedVillains.length > 0 && !selectedVillains.includes(villain)

  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } =
    useTooltip<VillainRow>()

  const uniqueYears = Array.from(new Set(years))

  return (
    <div style={{ position: 'relative' }}>
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={
          isFilmMode
            ? 'Vilões principais de cada filme live-action do Batman, um filme por linha — linhas tracejadas ligam retornos do mesmo vilão'
            : 'Linha do tempo dos vilões do Batman no cinema — Coringa, Duas-Caras e Charada voltam mais de uma vez'
        }
      >
        <Group left={margin.left} top={margin.top}>
          {/* Rótulos, linhas de apoio e eixo trocam com o modo: somem rápido
              e reaparecem já no lugar novo, enquanto os pontos (que não são
              desmontados) deslizam entre os dois layouts. */}
          <motion.g
            key={mode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.35, ease: 'easeOut' }}
          >
            {(isFilmMode ? filmTitles : villainNames).map((name) => {
              const y = (isFilmMode ? filmY(name) : villainY(name)) ?? 0
              const isRecurring = !isFilmMode && (countByVillain.get(name) ?? 0) > 1
              const dimmed = !isFilmMode && isDimmed(name)
              const label = isFilmMode ? `${name} (${yearByTitle.get(name)})` : name
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
                    opacity={dimmed ? DIMMED_OPACITY : 1}
                    style={!isFilmMode && !compact ? { cursor: 'pointer' } : undefined}
                    onClick={!isFilmMode && !compact ? () => onToggleVillain?.(name) : undefined}
                  >
                    {truncateToWidth(label, margin.left - 16, labelFontSize)}
                  </text>
                  <line x1={0} x2={innerWidth} y1={y} y2={y} stroke={neutral[100]} strokeWidth={1} />
                </Group>
              )
            })}

            {!isFilmMode &&
              showYearAxis &&
              uniqueYears.map((year) => (
                <text
                  key={year}
                  x={yearX(year)}
                  y={innerHeight + 16}
                  textAnchor="middle"
                  fontSize={compact ? 9 : 10}
                  fill={neutral[500]}
                >
                  {year}
                </text>
              ))}

            {/* No modo filme o nome do vilão vai ao lado do ponto (a linha
                agora é o filme, então sem isso não dá pra saber quem é quem). */}
            {isFilmMode &&
              data.map((d) => {
                const { cx, cy } = dotPosition(d)
                const isRecurring = (countByVillain.get(d.villain) ?? 0) > 1
                const dimmed = isDimmed(d.villain)
                return (
                  <text
                    key={`${d.villain}-${d.year}`}
                    x={cx + 12}
                    y={cy}
                    dominantBaseline="middle"
                    fontSize={10}
                    fontWeight={isRecurring ? 600 : 400}
                    fill={isRecurring ? accent[700] : neutral[600]}
                    opacity={dimmed ? DIMMED_OPACITY : 1}
                    style={!compact ? { cursor: 'pointer' } : undefined}
                    onClick={!compact ? () => onToggleVillain?.(d.villain) : undefined}
                  >
                    {truncateToWidth(d.villain, slotSpacing - 28, 10)}
                  </text>
                )
              })}
          </motion.g>

          {/* Conector entre as aparições de cada vilão recorrente. No modo
              vilão é uma reta horizontal; no modo filme vira um fio diagonal
              ligando linhas diferentes — o "retorno" continua visível nos
              dois layouts. O <g> externo cuida só da entrada (fade depois
              dos pontos surgirem, apontando pra relação-chave do capítulo);
              a linha interna cuida de posição e esmaecimento. Animar via
              pathLength quebraria o tracejado (o framer sobrescreve o
              stroke-dasharray), por isso o fade. */}
          {villainNames
            .filter((name) => (countByVillain.get(name) ?? 0) > 1)
            .map((name) => {
              const rows = data.filter((d) => d.villain === name)
              const from = dotPosition(rows[0])
              const to = dotPosition(rows[rows.length - 1])
              return (
                <motion.g
                  key={name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.5, ease: 'easeOut' }}
                >
                  <motion.line
                    stroke={accent[400]}
                    strokeWidth={2}
                    strokeDasharray="4,3"
                    initial={false}
                    animate={{
                      x1: from.cx,
                      y1: from.cy,
                      x2: to.cx,
                      y2: to.cy,
                      opacity: isDimmed(name) ? DIMMED_OPACITY : 1,
                    }}
                    transition={{
                      x1: MOVE,
                      y1: MOVE,
                      x2: MOVE,
                      y2: MOVE,
                      opacity: { duration: 0.35, ease: 'easeOut' },
                    }}
                  />
                </motion.g>
              )
            })}

          {data.map((d, i) => {
            const { cx, cy } = dotPosition(d)
            const isRecurring = (countByVillain.get(d.villain) ?? 0) > 1
            const dimmed = isDimmed(d.villain)
            // Tamanho reforça a cor (codificação dupla, melhor pra
            // daltônicos): recorrente é dourado E maior.
            const radius = compact ? (isRecurring ? 5.5 : 4) : isRecurring ? 7 : 5
            return (
              <motion.circle
                key={`${d.villain}-${d.year}`}
                r={radius}
                fill={isRecurring ? accent[500] : neutral[400]}
                stroke="white"
                strokeWidth={1.5}
                style={{ cursor: 'pointer' }}
                initial={{ opacity: 0, scale: 0, cx, cy }}
                animate={{ opacity: dimmed ? DIMMED_OPACITY : 1, scale: 1, cx, cy }}
                transition={{
                  opacity: { duration: 0.35, ease: 'easeOut' },
                  scale: { duration: 0.4, delay: i * 0.05 },
                  cx: MOVE,
                  cy: MOVE,
                }}
                onClick={!compact ? () => onToggleVillain?.(d.villain) : undefined}
                onMouseMove={(e) => {
                  // Fora da seleção, o ponto fica "desligado" também no hover.
                  if (dimmed) {
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

/** Chip clicável da legenda — destaca um grupo inteiro de vilões (mesma
 * linguagem da legenda do Tomatômetro no gráfico de bilheteria). */
function LegendChip({
  color,
  label,
  active,
  anySelection,
  onClick,
}: {
  color: string
  label: string
  active: boolean
  anySelection: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={`Destacar o grupo "${label}" no gráfico`}
      className={cn(
        'flex cursor-pointer items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] transition hover:bg-muted',
        anySelection && !active && 'opacity-45',
      )}
      style={active ? { backgroundColor: accent[50] } : undefined}
    >
      <span
        className="size-2.5 shrink-0 rounded-full"
        style={{
          backgroundColor: color,
          boxShadow: active ? `0 0 0 2px ${accent[400]}` : undefined,
        }}
      />
      {label}
    </button>
  )
}

export function VillainsTimelineChart({
  data,
  compact = false,
}: {
  data: VillainRow[]
  compact?: boolean
}) {
  const [mode, setMode] = useState<Mode>('villain')
  const [showYearAxis, setShowYearAxis] = useState(true)
  const [selectedVillains, setSelectedVillains] = useState<string[]>([])

  const countByVillain = new Map<string, number>()
  for (const d of data) countByVillain.set(d.villain, (countByVillain.get(d.villain) ?? 0) + 1)
  const villainNames = Array.from(new Set(data.map((d) => d.villain)))
  const recurringNames = villainNames.filter((n) => (countByVillain.get(n) ?? 0) > 1)
  const singleNames = villainNames.filter((n) => (countByVillain.get(n) ?? 0) === 1)

  const toggleVillain = (name: string) =>
    setSelectedVillains((current) =>
      current.includes(name) ? current.filter((n) => n !== name) : [...current, name],
    )

  // Clique na legenda seleciona/deseleciona o grupo inteiro de uma vez.
  const toggleGroup = (group: string[]) =>
    setSelectedVillains((current) =>
      group.every((n) => current.includes(n))
        ? current.filter((n) => !group.includes(n))
        : Array.from(new Set([...current, ...group])),
    )

  const groupActive = (group: string[]) =>
    group.length > 0 && group.every((n) => selectedVillains.includes(n))

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
                mode={compact ? 'villain' : mode}
                showYearAxis={showYearAxis}
                selectedVillains={selectedVillains}
                onToggleVillain={toggleVillain}
              />
            ) : null
          }
        </ParentSize>
      </div>

      {compact ? (
        <p className="text-center text-[11px] text-muted-foreground">
          Pontos dourados e maiores = vilão que voltou mais de uma vez.
        </p>
      ) : (
        <div className="flex flex-col items-center gap-1">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <LegendChip
              color={accent[500]}
              label="Voltou mais de uma vez"
              active={groupActive(recurringNames)}
              anySelection={selectedVillains.length > 0}
              onClick={() => toggleGroup(recurringNames)}
            />
            <LegendChip
              color={neutral[400]}
              label="Apareceu uma vez"
              active={groupActive(singleNames)}
              anySelection={selectedVillains.length > 0}
              onClick={() => toggleGroup(singleNames)}
            />
            <span className="h-3.5 w-px bg-border" aria-hidden="true" />
            {mode === 'villain' && (
              <button
                type="button"
                onClick={() => setShowYearAxis((v) => !v)}
                aria-pressed={showYearAxis}
                aria-label={`${showYearAxis ? 'Ocultar' : 'Mostrar'} anos embaixo do gráfico`}
                title={`${showYearAxis ? 'Ocultar' : 'Mostrar'} anos embaixo do gráfico`}
                className={cn(
                  'flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-sm transition',
                  showYearAxis ? '' : 'text-muted-foreground/70 hover:bg-muted hover:text-foreground',
                )}
                style={showYearAxis ? { backgroundColor: accent[100], color: accent[700] } : undefined}
              >
                <CalendarRange className="size-3" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setMode((m) => (m === 'villain' ? 'film' : 'villain'))}
              aria-pressed={mode === 'film'}
              title={
                mode === 'film'
                  ? 'Voltar pra linha do tempo por vilão'
                  : 'Ver por filme: quais filmes empilharam vilões'
              }
              className={cn(
                'flex cursor-pointer items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium transition',
                mode === 'film' ? '' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
              style={mode === 'film' ? { backgroundColor: accent[100], color: accent[700] } : undefined}
            >
              <Clapperboard className="size-3" />
              {mode === 'film' ? 'Por filme' : 'Por vilão'}
            </button>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            {mode === 'film'
              ? 'Cada linha é um filme; os pontos são seus vilões principais. O fio tracejado liga os retornos do mesmo vilão.'
              : 'Dourado e maior = vilão que voltou. Clique num vilão, num ponto ou num grupo pra destacar; passe o mouse pra ver filme e ator.'}
          </p>
        </div>
      )}
    </div>
  )
}
