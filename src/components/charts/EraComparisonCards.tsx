import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import type { BatmanBoxOfficeRow } from '@/data/loaders/loadBatmanBoxOffice'

function formatUsd(v: number) {
  return `US$ ${(v / 1_000_000).toFixed(0)} mi`
}

function average(values: number[]) {
  return values.reduce((a, b) => a + b, 0) / values.length
}

export function EraComparisonCards({ data }: { data: BatmanBoxOfficeRow[] }) {
  const before = data.filter((d) => d.year <= 1997)
  const after = data.filter((d) => d.year >= 2005)

  const beforeGross = average(before.map((d) => d.worldwideGrossUsd))
  const afterGross = average(after.map((d) => d.worldwideGrossUsd))
  const beforeRt = average(before.map((d) => d.rtScore))
  const afterRt = average(after.map((d) => d.rtScore))

  const grossChangePct = Math.round(((afterGross - beforeGross) / beforeGross) * 100)

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <div className="grid w-full max-w-xl grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-md border p-5 text-center"
          style={{ borderColor: neutral[300] }}
        >
          <p className="text-xs font-medium text-muted-foreground">
            1989–1997 (Burton / Schumacher)
          </p>
          <p className="mt-3 text-3xl font-semibold" style={{ color: neutral[700] }}>
            {formatUsd(beforeGross)}
          </p>
          <p className="text-xs text-muted-foreground">bilheteria média</p>
          <p className="mt-2 text-xl font-semibold" style={{ color: neutral[700] }}>
            {beforeRt.toFixed(0)}%
          </p>
          <p className="text-xs text-muted-foreground">nota média no Rotten Tomatoes</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-md border p-5 text-center"
          style={{ borderColor: accent[500], backgroundColor: accent[50] }}
        >
          <p className="text-xs font-medium" style={{ color: accent[800] }}>
            2005–2022 (Nolan / Reeves)
          </p>
          <p className="mt-3 text-3xl font-semibold" style={{ color: accent[700] }}>
            {formatUsd(afterGross)}
          </p>
          <p className="text-xs" style={{ color: accent[700] }}>
            bilheteria média
          </p>
          <p className="mt-2 text-xl font-semibold" style={{ color: accent[700] }}>
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
        className="text-center text-sm font-medium"
        style={{ color: accent[700] }}
      >
        +{grossChangePct}% de bilheteria média — e de "podre" ({beforeRt.toFixed(0)}%) pra
        "certificado fresco" ({afterRt.toFixed(0)}%) no Rotten Tomatoes.
      </motion.p>
    </div>
  )
}
