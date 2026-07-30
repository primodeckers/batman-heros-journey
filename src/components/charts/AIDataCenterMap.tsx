import { Group } from '@visx/group'
import { NaturalEarth } from '@visx/geo'
import { ParentSize } from '@visx/responsive'
import { scaleSqrt } from '@visx/scale'
import { motion } from 'framer-motion'
import type { Feature, FeatureCollection, Geometry } from 'geojson'

import { countryCentroids } from '@/data/countryCentroids'
import type { CountryDataCenterAggregate } from '@/data/loaders/loadAIDataCenters'
import { accent, neutral } from '@/theme/palette'

type ChartProps = {
  countries: Feature<Geometry>[]
  bubbles: CountryDataCenterAggregate[]
  width: number
  height: number
}

function Chart({ countries, bubbles, width, height }: ChartProps) {
  const featureCollection: FeatureCollection = { type: 'FeatureCollection', features: countries }

  const radiusScale = scaleSqrt<number>({
    domain: [0, Math.max(...bubbles.map((b) => b.totalPowerMw))],
    range: [3, Math.min(width, height) / 5],
  })

  return (
    <svg
      width={width}
      height={height}
      role="img"
      aria-label="Mapa-múndi com o tamanho das bolhas representando a potência total dos data centers de IA em cada país"
    >
      <NaturalEarth<Feature<Geometry>>
        data={countries}
        fitSize={[
          [width, height],
          featureCollection as unknown as Feature<Geometry>,
        ]}
      >
        {({ features, projection }) => (
          <>
            <Group>
              {features.map(({ path, index }) => (
                <path
                  key={index}
                  d={path ?? undefined}
                  fill={neutral[100]}
                  stroke={neutral[300]}
                  strokeWidth={0.5}
                />
              ))}
            </Group>

            <Group>
              {bubbles.map((b, i) => {
                const centroid = countryCentroids[b.country]
                if (!centroid) return null
                const point = projection(centroid)
                if (!point) return null
                const [x, y] = point
                const r = radiusScale(b.totalPowerMw)
                const isTop = i === 0

                return (
                  <Group key={b.country} left={x} top={y}>
                    {isTop && (
                      <motion.circle
                        r={r}
                        fill={accent[400]}
                        initial={{ opacity: 0.5, scale: 1 }}
                        animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.7, 1] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                      />
                    )}
                    <motion.circle
                      initial={{ r: 0 }}
                      animate={{ r }}
                      transition={{ duration: 0.7, delay: i * 0.08, ease: 'backOut' }}
                      fill={isTop ? accent[500] : neutral[400]}
                      fillOpacity={0.85}
                      stroke={isTop ? accent[700] : neutral[600]}
                      strokeWidth={1}
                    />
                    <text
                      y={-r - 4}
                      textAnchor="middle"
                      fontSize={10}
                      fontWeight={isTop ? 600 : 400}
                      fill={isTop ? accent[700] : neutral[600]}
                    >
                      {b.country} ({b.count})
                    </text>
                  </Group>
                )
              })}
            </Group>
          </>
        )}
      </NaturalEarth>
    </svg>
  )
}

export function AIDataCenterMap({
  countries,
  bubbles,
}: {
  countries: Feature<Geometry>[]
  bubbles: CountryDataCenterAggregate[]
}) {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 && height > 0 ? (
          <Chart countries={countries} bubbles={bubbles} width={width} height={height} />
        ) : null
      }
    </ParentSize>
  )
}
