import { ParentSize } from '@visx/responsive'
import { scaleLinear } from '@visx/scale'
import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import type { IEAEstimate } from '@/types/data'

type ChartProps = {
  data: IEAEstimate
  width: number
  height: number
}

function Chart({ data, width, height }: ChartProps) {
  const trackHeight = 28
  const trackY = height / 2 - trackHeight / 2

  const xScale = scaleLinear<number>({
    domain: [0, data.valueHigh * 1.15],
    range: [0, width],
    nice: true,
  })

  const x0 = xScale(data.valueLow)
  const x1 = xScale(data.valueHigh)

  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <p className="text-sm text-muted-foreground">
        Estimativa pra {data.year}: entre{' '}
        <span className="font-semibold text-foreground">
          {data.valueLow.toLocaleString('pt-BR')}
        </span>{' '}
        e{' '}
        <span className="font-semibold text-foreground">
          {data.valueHigh.toLocaleString('pt-BR')}
        </span>{' '}
        {data.unit}
      </p>
      <svg
        width={width}
        height={height * 0.4}
        role="img"
        aria-label={`Pegada de água estimada da IA em ${data.year}, entre ${data.valueLow} e ${data.valueHigh} ${data.unit}`}
      >
        <rect
          x={0}
          y={trackY}
          width={width}
          height={trackHeight}
          rx={trackHeight / 2}
          fill={neutral[200]}
        />
        <motion.rect
          x={0}
          y={trackY}
          initial={{ width: 0 }}
          animate={{ width: x1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          height={trackHeight}
          rx={trackHeight / 2}
          fill={accent[400]}
        />
        <motion.rect
          x={0}
          y={trackY}
          initial={{ width: 0 }}
          animate={{ width: x0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          height={trackHeight}
          rx={trackHeight / 2}
          fill={accent[600]}
        />
      </svg>
    </div>
  )
}

export function WaterFootprintChart({ data }: { data: IEAEstimate }) {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 && height > 0 ? <Chart data={data} width={width} height={height} /> : null
      }
    </ParentSize>
  )
}
