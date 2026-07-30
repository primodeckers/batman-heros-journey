import { Group } from '@visx/group'
import { ParentSize } from '@visx/responsive'
import { scaleBand, scaleLinear } from '@visx/scale'
import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import type { ElectricityComparisonRow } from '@/hooks/useElectricityEquivalence'

type ChartProps = {
  data: ElectricityComparisonRow[]
  width: number
  height: number
}

function Chart({ data, width, height }: ChartProps) {
  // Margens e fonte proporcionais à largura — evita que o texto "coma"
  // o gráfico (ou se sobreponha) em cards estreitos.
  const marginLeft = Math.max(56, Math.min(132, width * 0.42))
  const marginRight = Math.max(28, Math.min(48, width * 0.16))
  const margin = { top: 8, right: marginRight, bottom: 8, left: marginLeft }
  const fontSize = width < 220 ? 9 : 11

  const innerWidth = Math.max(width - margin.left - margin.right, 0)
  const innerHeight = Math.max(height - margin.top - margin.bottom, 0)

  const yScale = scaleBand<string>({
    domain: data.map((d) => d.label),
    range: [0, innerHeight],
    padding: 0.3,
  })

  const xScale = scaleLinear<number>({
    domain: [0, Math.max(...data.map((d) => d.electricityDemandTwh))],
    range: [0, innerWidth],
    nice: true,
  })

  const barHeight = yScale.bandwidth()

  return (
    <svg
      width={width}
      height={height}
      role="img"
      aria-label="Comparação da projeção de consumo elétrico dos data centers de IA em 2030 contra a demanda elétrica real de países"
    >
      <Group left={margin.left} top={margin.top}>
        {data.map((d, i) => {
          const barY = yScale(d.label) ?? 0
          const barWidth = xScale(d.electricityDemandTwh)
          return (
            <Group key={d.label} top={barY}>
              <text
                x={-8}
                y={barHeight / 2}
                dy=".35em"
                textAnchor="end"
                fontSize={fontSize}
                fontWeight={d.isAI ? 600 : 400}
                fill={d.isAI ? accent[700] : neutral[600]}
              >
                {d.label}
              </text>
              <motion.rect
                initial={{ width: 0 }}
                animate={{ width: barWidth }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: 'easeOut' }}
                height={barHeight}
                rx={4}
                fill={d.isAI ? accent[500] : neutral[300]}
              />
              <text
                x={barWidth + 8}
                y={barHeight / 2}
                dy=".35em"
                fontSize={fontSize}
                fontWeight={d.isAI ? 600 : 400}
                fill={d.isAI ? accent[700] : neutral[600]}
              >
                {Math.round(d.electricityDemandTwh).toLocaleString('pt-BR')}
              </text>
            </Group>
          )
        })}
      </Group>
    </svg>
  )
}

export function ElectricityEquivalenceChart({ data }: { data: ElectricityComparisonRow[] }) {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 && height > 0 ? <Chart data={data} width={width} height={height} /> : null
      }
    </ParentSize>
  )
}
