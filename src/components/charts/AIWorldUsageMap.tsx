import { useMemo, useState } from 'react'
import { Group } from '@visx/group'
import { NaturalEarth } from '@visx/geo'
import { ParentSize } from '@visx/responsive'
import { scaleQuantize } from '@visx/scale'
import { TooltipWithBounds, useTooltip } from '@visx/tooltip'
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

type ChartProps = {
  countries: Feature<Geometry>[]
  usageByName: Map<string, CountryUsageRow>
  metric: (typeof METRICS)[number]
  width: number
  height: number
  onHover: (row: CountryUsageRow | null, coords: { x: number; y: number } | null) => void
}

function Chart({ countries, usageByName, metric, width, height, onHover }: ChartProps) {
  const featureCollection: FeatureCollection = { type: 'FeatureCollection', features: countries }

  const colorScale = scaleQuantize<string>({
    domain: [0, metric.domainMax],
    range: COLOR_STOPS,
  })

  return (
    <svg
      width={width}
      height={height}
      role="img"
      aria-label={`Mapa-múndi colorido por ${metric.label}, dados do Anthropic Economic Index`}
    >
      <NaturalEarth<Feature<Geometry>>
        data={countries}
        fitSize={[[width, height], featureCollection as unknown as Feature<Geometry>]}
      >
        {({ features }) => (
          <Group>
            {features.map(({ feature: f, path, index }) => {
              const name = f.properties?.name as string | undefined
              const row = name ? usageByName.get(name) : undefined
              const rawValue = row ? row[metric.key] : undefined
              const hasValue = typeof rawValue === 'number' && !Number.isNaN(rawValue)
              const fill = hasValue
                ? colorScale(Math.min(rawValue, metric.domainMax))
                : neutral[50]
              return (
                <path
                  key={index}
                  d={path ?? undefined}
                  fill={fill}
                  stroke={neutral[300]}
                  strokeWidth={0.4}
                  onMouseMove={(e) => {
                    if (row) onHover(row, { x: e.clientX, y: e.clientY })
                  }}
                  onMouseLeave={() => onHover(null, null)}
                  style={{ cursor: row ? 'pointer' : 'default' }}
                />
              )
            })}
          </Group>
        )}
      </NaturalEarth>
    </svg>
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
  const metric = METRICS[metricIndex]

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

  const handleHover = (row: CountryUsageRow | null, coords: { x: number; y: number } | null) => {
    if (row && coords) {
      showTooltip({ tooltipData: row, tooltipLeft: coords.x, tooltipTop: coords.y })
    } else {
      hideTooltip()
    }
  }

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex flex-wrap gap-1.5">
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
      </div>

      <div className="relative flex-1">
        <ParentSize>
          {({ width, height }) =>
            width > 0 && height > 0 ? (
              <Chart
                countries={countries}
                usageByName={usageByName}
                metric={metric}
                width={width}
                height={height}
                onHover={handleHover}
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
              <p>PIB/capita: US$ {Math.round(tooltipData.gdpPerWorkingAgeCapita).toLocaleString('pt-BR')}</p>
            </div>
          </TooltipWithBounds>
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {metric.label} — cor mais escura = valor mais alto. Passe o mouse sobre um país. Alguns
        microestados (Mônaco, Singapura, Malta...) não aparecem no mapa por serem pequenos demais
        nessa resolução.
      </p>
    </div>
  )
}
