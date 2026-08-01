import { motion } from 'framer-motion'
import { Skull, Sunrise } from 'lucide-react'

import { accent, neutral } from '@/theme/palette'
import type { ComicsTimelineRow } from '@/data/loaders/loadComicsTimeline'

export function ComicsTimelineChart({ data }: { data: ComicsTimelineRow[] }) {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex-1 overflow-y-auto py-2">
        <ol className="relative border-l-2 pl-6" style={{ borderColor: neutral[200] }}>
          {data.map((row, i) => {
            const isReturn = row.type === 'retorno'
            return (
              <motion.li
                key={row.year + row.title}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="mb-6 last:mb-0"
              >
                <span
                  className="absolute -left-[13px] flex size-6 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: isReturn ? accent[500] : neutral[700],
                  }}
                >
                  {isReturn ? (
                    <Sunrise className="size-3.5 text-white" />
                  ) : (
                    <Skull className="size-3.5 text-white" />
                  )}
                </span>
                <p
                  className="text-xs font-semibold"
                  style={{ color: isReturn ? accent[700] : neutral[700] }}
                >
                  {row.year} · {row.title}
                </p>
                <p className="text-sm">{row.event}</p>
              </motion.li>
            )
          })}
        </ol>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Preto = queda/quase-morte · dourado = retorno. O padrão se repete 3 vezes em 22 anos de
        história editorial — não é um caso isolado.
      </p>
    </div>
  )
}
