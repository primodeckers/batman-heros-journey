import { Group } from '@visx/group'
import { LinePath } from '@visx/shape'
import { ParentSize } from '@visx/responsive'
import { scaleLinear, scalePoint } from '@visx/scale'
import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import { truncateToWidth } from '@/utils/text'
import type { LanguageTrendPoint } from '@/types/data'

const HIGHLIGHT_LANGUAGE = 'TypeScript'

type ChartProps = { data: LanguageTrendPoint[]; width: number; height: number }

function Chart({ data, width, height }: ChartProps) {
  const periods = [...new Set(data.map((d) => `${d.year}-Q${d.quarter}`))].sort()
  const languages = [...new Set(data.map((d) => d.language))]

  const fontSize = 11
  const longestLabel = Math.max(...languages.map((l) => l.length))
  const marginRight = Math.max(70, Math.min(100, longestLabel * fontSize * 0.58 + 12))
  const margin = { top: 16, right: marginRight, bottom: 28, left: 56 }
  const innerWidth = Math.max(width - margin.left - margin.right, 0)
  const innerHeight = Math.max(height - margin.top - margin.bottom, 0)

  const xScale = scalePoint<string>({ domain: periods, range: [0, innerWidth] })
  const yScale = scaleLinear<number>({
    domain: [0, Math.max(...data.map((d) => d.numPushers)) * 1.05],
    range: [innerHeight, 0],
    nice: true,
  })

  const byLanguage = (lang: string) =>
    periods.map((p) => {
      const [year, q] = p.split('-Q').map(Number)
      return data.find((d) => d.language === lang && d.year === year && d.quarter === q)
    })

  const yearTicks = periods.filter((p) => p.endsWith('Q1'))

  return (
    <svg
      width={width}
      height={height}
      role="img"
      aria-label="Evolução trimestral do número de desenvolvedores que usam JavaScript, Python e TypeScript no GitHub, desde 2020"
    >
      <Group left={margin.left} top={margin.top}>
        {yScale.ticks(4).map((tick) => (
          <g key={tick}>
            <line x1={0} x2={innerWidth} y1={yScale(tick)} y2={yScale(tick)} stroke={neutral[100]} />
            <text x={-8} y={yScale(tick)} dy=".32em" textAnchor="end" fontSize={10} fill={neutral[500]}>
              {tick >= 1e6 ? `${(tick / 1e6).toFixed(1)}M` : `${Math.round(tick / 1e3)}k`}
            </text>
          </g>
        ))}

        {yearTicks.map((p) => (
          <text
            key={p}
            x={xScale(p)}
            y={innerHeight + 20}
            textAnchor="middle"
            fontSize={10}
            fill={neutral[500]}
          >
            {p.split('-')[0]}
          </text>
        ))}

        {languages.map((lang) => {
          const isHighlight = lang === HIGHLIGHT_LANGUAGE
          const points = byLanguage(lang)
          return (
            <motion.g
              key={lang}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <LinePath
                data={points}
                x={(_d, i) => xScale(periods[i]) ?? 0}
                y={(d) => (d ? yScale(d.numPushers) : 0)}
                stroke={isHighlight ? accent[500] : neutral[300]}
                strokeWidth={isHighlight ? 3 : 2}
                curve={undefined}
              />
              <text
                x={innerWidth + 6}
                y={yScale(points[points.length - 1]?.numPushers ?? 0)}
                dy=".32em"
                fontSize={fontSize}
                fontWeight={isHighlight ? 600 : 400}
                fill={isHighlight ? accent[700] : neutral[500]}
              >
                {truncateToWidth(lang, marginRight - 10, fontSize)}
              </text>
            </motion.g>
          )
        })}
      </Group>
    </svg>
  )
}

export function LanguageTrendChart({ data }: { data: LanguageTrendPoint[] }) {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 && height > 0 ? <Chart data={data} width={width} height={height} /> : null
      }
    </ParentSize>
  )
}
