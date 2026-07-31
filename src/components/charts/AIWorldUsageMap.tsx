import { useMemo, useRef, useState } from 'react'
import { Group } from '@visx/group'
import { NaturalEarth } from '@visx/geo'
import { ParentSize } from '@visx/responsive'
import { scaleQuantize } from '@visx/scale'
import { TooltipWithBounds, useTooltip } from '@visx/tooltip'
import { Zoom } from '@visx/zoom'
import type { ProvidedZoom, TransformMatrix, ZoomState } from '@visx/zoom'
import { animate, motion } from 'framer-motion'
import { Grid3x3, RotateCcw, Search } from 'lucide-react'
import type { Feature, FeatureCollection, Geometry } from 'geojson'

import { countryNameAliases } from '@/data/countryNameAliases'
import { accent, neutral } from '@/theme/palette'
import { cn } from '@/lib/utils'
import type { CountryUsageRow } from '@/types/data'

type MetricKey = 'usagePerCapitaIndex' | 'usagePct' | 'gdpPerWorkingAgeCapita'

const METRICS: { key: MetricKey; label: string; domainMax: number; format: (v: number) => string }[] = [
  {
    key: 'usagePerCapitaIndex',
    label: 'Uso per capita',
    domainMax: 3,
    format: (v) => `${v.toFixed(2)}x média mundial`,
  },
  {
    key: 'usagePct',
    label: '% do uso mundial',
    domainMax: 5,
    format: (v) => `${v.toFixed(2)}% do uso global`,
  },
  {
    key: 'gdpPerWorkingAgeCapita',
    label: 'PIB por pessoa',
    domainMax: 150000,
    format: (v) => `US$ ${Math.round(v).toLocaleString('pt-BR')}`,
  },
]

const COLOR_STOPS = [neutral[100], accent[100], accent[200], accent[400], accent[500], accent[700]]
const FLY_TO_SCALE = 5
const RANKING_SIZE = 12

type MapApi = { flyTo: (topoName: string) => void; reset: () => void }

type ChartProps = {
  countries: Feature<Geometry>[]
  usageByName: Map<string, CountryUsageRow>
  metric: (typeof METRICS)[number]
  width: number
  height: number
  showGraticule: boolean
  selectedTopoName: string | null
  onHover: (row: CountryUsageRow | null, coords: { x: number; y: number } | null) => void
  onSelect: (row: CountryUsageRow, topoName: string) => void
  apiRef: React.RefObject<MapApi | null>
}

function animateMatrix(
  from: TransformMatrix,
  to: TransformMatrix,
  onUpdate: (m: TransformMatrix) => void,
) {
  animate(0, 1, {
    duration: 0.65,
    ease: 'easeInOut',
    onUpdate: (t) => {
      onUpdate({
        scaleX: from.scaleX + (to.scaleX - from.scaleX) * t,
        scaleY: from.scaleY + (to.scaleY - from.scaleY) * t,
        translateX: from.translateX + (to.translateX - from.translateX) * t,
        translateY: from.translateY + (to.translateY - from.translateY) * t,
        skewX: 0,
        skewY: 0,
      })
    },
  })
}

function Chart({
  countries,
  usageByName,
  metric,
  width,
  height,
  showGraticule,
  selectedTopoName,
  onHover,
  onSelect,
  apiRef,
}: ChartProps) {
  const featureCollection: FeatureCollection = { type: 'FeatureCollection', features: countries }
  const centroidsRef = useRef<Map<string, [number, number]>>(new Map())

  const colorScale = scaleQuantize<string>({
    domain: [0, metric.domainMax],
    range: COLOR_STOPS,
  })

  return (
    <Zoom<SVGSVGElement>
      width={width}
      height={height}
      scaleXMin={0.9}
      scaleXMax={18}
      scaleYMin={0.9}
      scaleYMax={18}
    >
      {(zoom: ProvidedZoom<SVGSVGElement> & ZoomState) => {
        apiRef.current = {
          flyTo: (topoName) => {
            const centroid = centroidsRef.current.get(topoName)
            if (!centroid) return
            const target: TransformMatrix = {
              scaleX: FLY_TO_SCALE,
              scaleY: FLY_TO_SCALE,
              skewX: 0,
              skewY: 0,
              translateX: width / 2 - centroid[0] * FLY_TO_SCALE,
              translateY: height / 2 - centroid[1] * FLY_TO_SCALE,
            }
            animateMatrix(zoom.transformMatrix, target, zoom.setTransformMatrix)
          },
          reset: () => {
            animateMatrix(zoom.transformMatrix, zoom.initialTransformMatrix, zoom.setTransformMatrix)
          },
        }

        return (
          <svg
            width={width}
            height={height}
            ref={zoom.containerRef}
            role="img"
            aria-label={`Mapa-múndi interativo colorido por ${metric.label}, com zoom e busca — dados do Anthropic Economic Index`}
            style={{ touchAction: 'none', cursor: zoom.isDragging ? 'grabbing' : 'grab' }}
          >
            <rect width={width} height={height} fill="white" fillOpacity={0} />
            <g transform={zoom.toString()}>
              <NaturalEarth<Feature<Geometry>>
                data={countries}
                fitSize={[[width, height], featureCollection as unknown as Feature<Geometry>]}
                graticule={
                  showGraticule
                    ? // Tipagem do visx só expõe as props do gerador (extent/step/...), mas o
                      // componente repassa props de SVG (stroke etc.) pro <Graticule> interno.
                      ({
                        foreground: false,
                        stroke: neutral[200],
                        strokeWidth: 0.5 / zoom.transformMatrix.scaleX,
                      } as never)
                    : undefined
                }
              >
                {({ features, path }) => {
                  const map = new Map<string, [number, number]>()
                  for (const { feature: f, path: d } of features) {
                    const name = f.properties?.name as string | undefined
                    if (name && d) map.set(name, path.centroid(f))
                  }
                  centroidsRef.current = map

                  return (
                    <Group>
                      {features.map(({ feature: f, path: d, index }) => {
                        const name = f.properties?.name as string | undefined
                        const row = name ? usageByName.get(name) : undefined
                        const rawValue = row ? row[metric.key] : undefined
                        const hasValue = typeof rawValue === 'number' && !Number.isNaN(rawValue)
                        const fill = hasValue
                          ? colorScale(Math.min(rawValue, metric.domainMax))
                          : neutral[50]
                        const isSelected = name === selectedTopoName
                        return (
                          <path
                            key={index}
                            d={d ?? undefined}
                            fill={fill}
                            stroke={isSelected ? accent[700] : neutral[300]}
                            strokeWidth={(isSelected ? 1.5 : 0.4) / zoom.transformMatrix.scaleX}
                            onMouseMove={(e) => {
                              if (row) onHover(row, { x: e.clientX, y: e.clientY })
                            }}
                            onMouseLeave={() => onHover(null, null)}
                            onClick={() => {
                              if (row && name) onSelect(row, name)
                            }}
                            style={{ cursor: row ? 'pointer' : 'default' }}
                          />
                        )
                      })}
                    </Group>
                  )
                }}
              </NaturalEarth>

              {selectedTopoName &&
                centroidsRef.current.get(selectedTopoName) &&
                (() => {
                  const [cx, cy] = centroidsRef.current.get(selectedTopoName)!
                  const r = 5 / zoom.transformMatrix.scaleX
                  return (
                    <motion.circle
                      cx={cx}
                      cy={cy}
                      r={r}
                      fill="none"
                      stroke={accent[600]}
                      strokeWidth={2 / zoom.transformMatrix.scaleX}
                      initial={{ opacity: 0.9, scale: 1 }}
                      animate={{ opacity: [0.9, 0, 0.9], scale: [1, 2.4, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )
                })()}
            </g>
          </svg>
        )
      }}
    </Zoom>
  )
}

export function AIWorldUsageMap({
  countries,
  usage,
}: {
  countries: Feature<Geometry>[]
  usage: CountryUsageRow[]
}) {
  const [metricIndex, setMetricIndex] = useState(0)
  const [showGraticule, setShowGraticule] = useState(false)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<{ row: CountryUsageRow; topoName: string } | null>(null)
  const metric = METRICS[metricIndex]
  const apiRef = useRef<MapApi | null>(null)

  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } =
    useTooltip<CountryUsageRow>()

  const usageByName = useMemo(() => {
    const map = new Map<string, CountryUsageRow>()
    for (const row of usage) {
      const topoName = countryNameAliases[row.country] ?? row.country
      map.set(topoName, row)
    }
    return map
  }, [usage])

  const ranking = useMemo(
    () => [...usage].sort((a, b) => b[metric.key] - a[metric.key]).slice(0, RANKING_SIZE),
    [usage, metric.key],
  )

  const handleHover = (row: CountryUsageRow | null, coords: { x: number; y: number } | null) => {
    if (row && coords) {
      showTooltip({ tooltipData: row, tooltipLeft: coords.x, tooltipTop: coords.y })
    } else {
      hideTooltip()
    }
  }

  const goTo = (row: CountryUsageRow) => {
    const topoName = countryNameAliases[row.country] ?? row.country
    setSelected({ row, topoName })
    apiRef.current?.flyTo(topoName)
  }

  const handleSearchSubmit = () => {
    const match = usage.find((r) => r.country.toLowerCase() === search.trim().toLowerCase())
    if (match) goTo(match)
  }

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex flex-wrap items-center gap-1.5">
        {METRICS.map((m, i) => (
          <button
            key={m.key}
            type="button"
            onClick={() => setMetricIndex(i)}
            className={cn(
              'rounded-full border px-3 py-1 text-xs transition-colors',
              i === metricIndex ? 'font-medium' : 'border-border text-muted-foreground hover:bg-muted',
            )}
            style={
              i === metricIndex
                ? { borderColor: accent[500], backgroundColor: accent[50], color: accent[800] }
                : undefined
            }
          >
            {m.label}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-1.5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              list="country-options"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
              placeholder="Achar país…"
              className="h-7 w-32 rounded-full border border-border bg-background pl-7 pr-2 text-xs outline-none focus:border-current @sm:w-40"
              style={{ color: accent[700] }}
            />
            <datalist id="country-options">
              {usage.map((r) => (
                <option key={r.iso3} value={r.country} />
              ))}
            </datalist>
          </div>
          <button
            type="button"
            title="Mostrar/esconder grade de coordenadas"
            aria-pressed={showGraticule}
            onClick={() => setShowGraticule((v) => !v)}
            className={cn(
              'flex size-7 items-center justify-center rounded-full border transition-colors',
              showGraticule ? '' : 'border-border text-muted-foreground hover:bg-muted',
            )}
            style={showGraticule ? { borderColor: accent[500], color: accent[700] } : undefined}
          >
            <Grid3x3 className="size-3.5" />
          </button>
          <button
            type="button"
            title="Voltar pro mapa inteiro"
            onClick={() => {
              setSelected(null)
              apiRef.current?.reset()
            }}
            className="flex size-7 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="@container flex flex-1 gap-2 overflow-hidden">
        <div className="hidden w-40 shrink-0 overflow-y-auto @lg:block">
          <ol className="space-y-0.5">
            {ranking.map((row, i) => (
              <li key={row.iso3}>
                <button
                  type="button"
                  onClick={() => goTo(row)}
                  className={cn(
                    'flex w-full items-center gap-1.5 rounded px-1.5 py-1 text-left text-xs hover:bg-muted',
                    selected?.row.iso3 === row.iso3 && 'font-medium',
                  )}
                  style={selected?.row.iso3 === row.iso3 ? { color: accent[700] } : undefined}
                >
                  <span className="text-muted-foreground">{i + 1}.</span>
                  <span className="truncate">{row.country}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative min-w-0 flex-1">
          <ParentSize>
            {({ width, height }) =>
              width > 0 && height > 0 ? (
                <Chart
                  countries={countries}
                  usageByName={usageByName}
                  metric={metric}
                  width={width}
                  height={height}
                  showGraticule={showGraticule}
                  selectedTopoName={selected?.topoName ?? null}
                  onHover={handleHover}
                  onSelect={(row, topoName) => {
                    setSelected({ row, topoName })
                    apiRef.current?.flyTo(topoName)
                  }}
                  apiRef={apiRef}
                />
              ) : null
            }
          </ParentSize>

          {tooltipOpen && tooltipData && (
            <TooltipWithBounds left={tooltipLeft} top={tooltipTop} style={{ position: 'fixed' }}>
              <div className="text-xs">
                <p className="font-semibold" style={{ color: accent[700] }}>
                  {tooltipData.country}
                </p>
                <p>Uso per capita: {tooltipData.usagePerCapitaIndex.toFixed(2)}x média</p>
                <p>Uso mundial: {tooltipData.usagePct.toFixed(2)}%</p>
                <p>
                  PIB/capita: US$ {Math.round(tooltipData.gdpPerWorkingAgeCapita).toLocaleString('pt-BR')}
                </p>
              </div>
            </TooltipWithBounds>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Arraste pra mover, role o mouse pra dar zoom, ou busque/clique num país da lista pra saltar
        até ele. {metric.label}: cor mais escura = valor mais alto.
      </p>
    </div>
  )
}
