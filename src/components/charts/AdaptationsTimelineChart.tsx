import { motion } from 'framer-motion'
import { BookOpen, Film, Tv } from 'lucide-react'

import { accent, neutral } from '@/theme/palette'
import { cn } from '@/lib/utils'
import type { AdaptationRow } from '@/data/loaders/loadAdaptationsTimeline'

const MEDIUM_ICON = { Quadrinho: BookOpen, Cinema: Film, TV: Tv } as const

export function AdaptationsTimelineChart({ data }: { data: AdaptationRow[] }) {
  const firstYear = data[0]?.year ?? 1939
  const lastYear = data[data.length - 1]?.year ?? 2022
  const span = lastYear - firstYear

  return (
    <div className="flex h-full flex-col justify-center gap-2">
      <div className="relative min-h-[220px] overflow-x-auto py-6">
        <div className="mx-16 relative min-w-[630px]">
          <div
            className="absolute top-[18px] h-0.5 w-full"
            style={{ backgroundColor: neutral[200] }}
          />
          {data.map((row, i) => {
            const Icon = MEDIUM_ICON[row.medium]
            const offsetPct = span > 0 ? ((row.year - firstYear) / span) * 100 : 0
            return (
              <motion.div
                key={row.year + row.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  'absolute flex w-28 -translate-x-1/2 flex-col items-center text-center',
                )}
                style={{ left: `${offsetPct}%` }}
              >
                <span
                  className="flex size-9 items-center justify-center rounded-full border-2"
                  style={{ borderColor: accent[500], backgroundColor: accent[50] }}
                >
                  <Icon className="size-4" style={{ color: accent[700] }} />
                </span>
                <p className="mt-1.5 text-xs font-semibold" style={{ color: accent[800] }}>
                  {row.year}
                </p>
                <p className="text-xs font-medium">{row.title}</p>
                <p className="text-[11px] text-muted-foreground">{row.note}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        86 anos entre a estreia em quadrinhos (1939) e o filme mais recente (2022) — poucos
        personagens de ficção atravessam tantas gerações e mídias sem parar de ser relevantes.
      </p>
    </div>
  )
}
