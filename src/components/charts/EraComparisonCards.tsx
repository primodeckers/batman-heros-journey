import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import { asset } from '@/utils/asset'
import { formatUsd } from '@/utils/format'
import type { BatmanBoxOfficeRow } from '@/data/loaders/loadBatmanBoxOffice'
import { ChapterSoundtrack } from './ChapterSoundtrack'

/** Faixa do último capítulo — trecho de 100s já recortado a partir do refrão
 * (0:55 da original), que é o que cabe no minuto reservado ao capítulo. */
const THEME_SRC = asset('audio/nirvana-something-in-the-way.mp3')

function average(values: number[]) {
  return values.reduce((a, b) => a + b, 0) / values.length
}

export function EraComparisonCards({
  data,
  compact = false,
}: {
  data: BatmanBoxOfficeRow[]
  compact?: boolean
}) {
  const before = data.filter((d) => d.year <= 1997)
  const after = data.filter((d) => d.year >= 2005)

  const beforeGross = average(before.map((d) => d.worldwideGrossUsd))
  const afterGross = average(after.map((d) => d.worldwideGrossUsd))
  const beforeRt = average(before.map((d) => d.rtScore))
  const afterRt = average(after.map((d) => d.rtScore))

  const grossChangePct = Math.round(((afterGross - beforeGross) / beforeGross) * 100)

  const cardClass = `rounded-md border text-center ${compact ? 'p-3' : 'p-5'}`
  const grossClass = compact ? 'mt-2 text-2xl font-semibold' : 'mt-3 text-3xl font-semibold'
  const scoreClass = compact ? 'mt-1.5 text-base font-semibold' : 'mt-2 text-xl font-semibold'

  return (
    <div
      className={`relative flex h-full flex-col items-center justify-center ${compact ? 'gap-3' : 'gap-6'}`}
    >
      <div className="grid w-full max-w-xl grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={cardClass}
          style={{ borderColor: neutral[300] }}
        >
          <p className="text-xs font-medium text-muted-foreground">
            1989–1997 (Burton / Schumacher)
          </p>
          <p className={grossClass} style={{ color: neutral[700] }}>
            {formatUsd(beforeGross)}
          </p>
          <p className="text-xs text-muted-foreground">bilheteria média</p>
          <p className={scoreClass} style={{ color: neutral[700] }}>
            {beforeRt.toFixed(0)}%
          </p>
          <p className="text-xs text-muted-foreground">nota média no Rotten Tomatoes</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className={cardClass}
          style={{ borderColor: accent[500], backgroundColor: accent[50] }}
        >
          <p className="text-xs font-medium" style={{ color: accent[800] }}>
            2005–2022 (Nolan / Reeves)
          </p>
          <p className={grossClass} style={{ color: accent[700] }}>
            {formatUsd(afterGross)}
          </p>
          <p className="text-xs" style={{ color: accent[700] }}>
            bilheteria média
          </p>
          <p className={scoreClass} style={{ color: accent[700] }}>
            {afterRt.toFixed(0)}%
          </p>
          <p className="text-xs" style={{ color: accent[700] }}>
            nota média no Rotten Tomatoes
          </p>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className={`text-center font-medium ${compact ? 'text-xs' : 'text-sm'}`}
        style={{ color: accent[700] }}
      >
        +{grossChangePct}% de bilheteria média — e de "podre" ({beforeRt.toFixed(0)}%) pra
        "certificado fresco" ({afterRt.toFixed(0)}%) no Rotten Tomatoes.
      </motion.p>

      {/* Só na apresentação: no grid do dashboard os seis cards dividem a
          tela, e trilha tocando sozinha ali seria ruído sem contexto. */}
      {!compact && (
        <div className="absolute right-0 bottom-0">
          <ChapterSoundtrack src={THEME_SRC} label="Something in the Way" />
        </div>
      )}
    </div>
  )
}
