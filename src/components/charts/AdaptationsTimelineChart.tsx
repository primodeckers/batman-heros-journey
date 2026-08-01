import { motion } from 'framer-motion'
import { BookOpen, Film, Tv } from 'lucide-react'

import { accent, neutral } from '@/theme/palette'
import type { AdaptationRow } from '@/data/loaders/loadAdaptationsTimeline'

const MEDIUM_ICON = { Quadrinho: BookOpen, Cinema: Film, TV: Tv } as const

export function AdaptationsTimelineChart({ data }: { data: AdaptationRow[] }) {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex-1 overflow-y-auto py-2">
        <ol className="relative border-l-2 pl-6" style={{ borderColor: neutral[200] }}>
          {data.map((row, i) => {
            const Icon = MEDIUM_ICON[row.medium]
            const gap = i > 0 ? row.year - data[i - 1].year : null
            return (
              <motion.li
                key={row.year + row.title}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="mb-6 last:mb-0"
              >
                {gap !== null && (
                  <p className="mb-1 text-[11px] text-muted-foreground">{gap} anos depois</p>
                )}
                <span
                  className="absolute -left-[13px] flex size-6 items-center justify-center rounded-full"
                  style={{ backgroundColor: accent[500] }}
                >
                  <Icon className="size-3.5 text-white" />
                </span>
                <p className="text-xs font-semibold" style={{ color: accent[700] }}>
                  {row.year} · {row.title}
                  <span className="ml-1.5 font-normal text-muted-foreground">({row.medium})</span>
                </p>
                <p className="text-sm">{row.note}</p>
              </motion.li>
            )
          })}
        </ol>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        86 anos entre a estreia em quadrinhos (1939) e o filme mais recente (2022) — poucos
        personagens de ficção atravessam tantas gerações e mídias sem parar de ser relevantes.
      </p>
    </div>
  )
}
