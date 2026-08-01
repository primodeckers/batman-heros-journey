import { motion } from 'framer-motion'
import { BookOpen, Film, Tv } from 'lucide-react'

import { accent, neutral } from '@/theme/palette'
import type { AdaptationRow } from '@/data/loaders/loadAdaptationsTimeline'

const MEDIUM_ICON = { Quadrinho: BookOpen, Cinema: Film, TV: Tv } as const

export function AdaptationsTimelineChart({ data }: { data: AdaptationRow[] }) {
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      <div className="overflow-x-auto py-4">
        <div className="flex min-w-max items-start px-2">
          {data.map((row, i) => {
            const Icon = MEDIUM_ICON[row.medium]
            const gap = i > 0 ? row.year - data[i - 1].year : null
            return (
              <div key={row.year + row.title} className="flex items-start">
                {gap !== null && (
                  <div className="flex w-14 shrink-0 flex-col items-center pt-[15px] sm:w-20">
                    <span className="whitespace-nowrap text-[10px] text-muted-foreground">
                      {gap} anos
                    </span>
                    <div className="h-0.5 w-full" style={{ backgroundColor: neutral[200] }} />
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex w-32 shrink-0 flex-col items-center text-center sm:w-36"
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
                  <p className="text-muted-foreground text-[10px]">({row.medium})</p>
                  <p className="text-muted-foreground mt-0.5 text-[11px]">{row.note}</p>
                </motion.div>
              </div>
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
