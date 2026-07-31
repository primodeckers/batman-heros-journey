import { Group } from '@visx/group'
import { LinePath } from '@visx/shape'
import { ParentSize } from '@visx/responsive'
import { scaleLog, scalePoint } from '@visx/scale'
import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import { truncateToWidth } from '@/utils/text'
import type { ProductivityAttenuationPoint } from '@/types/data'

const HIGHLIGHT_CATEGORY = 'Agentes interativos'
const CATEGORY_COLOR: Record<string, string> = {
  Autocomplete: neutral[400],
  'Agentes interativos': accent[500],
  'Agentes autônomos': neutral[600],
}

type ChartProps = { data: ProductivityAttenuationPoint[]; width: number; height: number }

function Chart({ data, width, height }: ChartProps) {
  const layers = [...new Set(data.map((d) => d.layer))].sort(
    (a, b) =>
      (data.find((d) => d.layer === a)?.layerOrder ?? 0) -
      (data.find((d) => d.layer === b)?.layerOrder ?? 0),
  )
  const categories = [...new Set(data.map((d) => d.toolCategory))]

  const fontSize = 11
  const longestLabel = Math.max(...categories.map((c) => c.length))
  const marginRight = Math.max(80, Math.min(120, longestLabel * fontSize * 0.58 + 12))
  const margin = { top: 16, right: marginRight, bottom: 40, left: 44 }
  const innerWidth = Math.max(width - margin.left - margin.right, 0)
  const innerHeight = Math.max(height - margin.top - margin.bottom, 0)

  const xScale = scalePoint<string>({ domain: layers, range: [0, innerWidth] })
  const yScale = scaleLog<number>({
    domain: [8, Math.max(...data.map((d) => d.effectPct)) * 1.15],
    range: [innerHeight, 0],
  })

  const byCategory = (cat: string) =>
    layers
      .map((layer) => data.find((d) => d.toolCategory === cat && d.layer === layer))
      .filter((d): d is ProductivityAttenuationPoint => !!d)

  return (
    <svg
      width={width}
      height={height}
      role="img"
      aria-label="Atenuação do ganho de produtividade da IA conforme desce da linha de código até o release final, por categoria de ferramenta"
    >
      <Group left={margin.left} top={margin.top}>
        {yScale.ticks(4).map((tick) => (
          <g key={tick}>
            <line
              x1={0}
              x2={innerWidth}
              y1={yScale(tick)}
              y2={yScale(tick)}
              stroke={neutral[100]}
            />
            <text x={-8} y={yScale(tick)} dy=".32em" textAnchor="end" fontSize={10} fill={neutral[500]}>
              +{Math.round(tick)}%
            </text>
          </g>
        ))}

        {layers.map((layer) => (
          <text
            key={layer}
            x={xScale(layer)}
            y={innerHeight + 16}
            textAnchor="middle"
            fontSize={9.5}
            fill={neutral[500]}
          >
            {layer.length > 10 ? layer.split(' ')[0] : layer}
          </text>
        ))}

        {categories.map((cat) => {
          const isHighlight = cat === HIGHLIGHT_CATEGORY
          const points = byCategory(cat)
          const color = CATEGORY_COLOR[cat] ?? neutral[400]
          const lastPoint = points[points.length - 1]
          return (
            <motion.g
              key={cat}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <LinePath
                data={points}
                x={(d) => xScale(d.layer) ?? 0}
                y={(d) => yScale(d.effectPct)}
                stroke={color}
                strokeWidth={isHighlight ? 3 : 2}
              />
              {points.map((p) => (
                <circle
                  key={p.layer}
                  cx={xScale(p.layer)}
                  cy={yScale(p.effectPct)}
                  r={isHighlight ? 4 : 3}
                  fill={color}
                />
              ))}
              {lastPoint && (
                <text
                  x={(xScale(lastPoint.layer) ?? 0) + 8}
                  y={yScale(lastPoint.effectPct)}
                  dy=".32em"
                  fontSize={fontSize}
                  fontWeight={isHighlight ? 600 : 400}
                  fill={isHighlight ? accent[700] : neutral[600]}
                >
                  {truncateToWidth(cat, marginRight - 12, fontSize)}
                </text>
              )}
            </motion.g>
          )
        })}
      </Group>
    </svg>
  )
}

export function ProductivityAttenuationChart({ data }: { data: ProductivityAttenuationPoint[] }) {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 && height > 0 ? <Chart data={data} width={width} height={height} /> : null
      }
    </ParentSize>
  )
}
