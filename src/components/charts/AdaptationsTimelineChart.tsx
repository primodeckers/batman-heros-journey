import { motion } from 'framer-motion'
import { BookOpen, Film, Tv } from 'lucide-react'

import { accent, neutral } from '@/theme/palette'
import type { AdaptationRow } from '@/data/loaders/loadAdaptationsTimeline'

const MEDIUM_ICON = { Quadrinho: BookOpen, Cinema: Film, TV: Tv } as const

export function AdaptationsTimelineChart({ data }: { data: AdaptationRow[] }) {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="flex items-start">
        {data.map((row, i) => {
          const Icon = MEDIUM_ICON[row.medium]
          const gap = i > 0 ? row.year - data[i - 1].year : null
          return (
            <div key={row.year + row.title} className="flex min-w-0 flex-1 items-start">
              {gap !== null && (
                <div className="flex w-8 shrink-0 flex-col items-center pt-[17px] sm:w-12">
                  <span className="whitespace-nowrap text-[10px] text-muted-foreground">
                    {gap}a
                  </span>
                  <div className="h-0.5 w-full" style={{ backgroundColor: neutral[200] }} />
                </div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex min-w-0 flex-1 flex-col items-center text-center"
              >
                <span
                  className="flex size-10 items-center justify-center rounded-full border-2"
                  style={{ borderColor: accent[500], backgroundColor: accent[50] }}
                >
                  <Icon className="size-5" style={{ color: accent[700] }} />
                </span>
                <p className="mt-2 text-sm font-semibold" style={{ color: accent[800] }}>
                  {row.year}
                </p>
                <p className="text-xs font-medium">{row.title}</p>
                <p className="text-muted-foreground text-[11px]">({row.medium})</p>
                <p className="text-muted-foreground mt-1 text-xs leading-snug">{row.note}</p>
              </motion.div>
            </div>
          )
        })}
      </div>
      <p className="text-center text-sm text-muted-foreground">
        86 anos entre a estreia em quadrinhos (1939) e o filme mais recente (2022) — poucos
        personagens de ficção atravessam tantas gerações e mídias sem parar de ser relevantes.
      </p>
    </div>
  )
}
