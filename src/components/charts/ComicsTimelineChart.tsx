import { motion } from 'framer-motion'
import { Skull, Sunrise } from 'lucide-react'

import { accent, neutral } from '@/theme/palette'
import type { ComicsTimelineRow } from '@/data/loaders/loadComicsTimeline'

/**
 * Diagrama circular em vez de mais uma linha do tempo: a história aqui
 * (morte -> retorno -> morte -> retorno) é literalmente um ciclo, então o
 * formato reforça o argumento em vez de só listar datas de novo — ver
 * docs/best-practices/selecao-de-graficos.md.
 */
export function ComicsTimelineChart({ data }: { data: ComicsTimelineRow[] }) {
  const n = data.length
  const radius = 38

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="relative aspect-square w-full max-w-[260px]">
        <div
          className="absolute inset-[8%] rounded-full border-2 border-dashed"
          style={{ borderColor: neutral[200] }}
        />
        {data.map((row, i) => {
          const isReturn = row.type === 'retorno'
          const angle = (i / n) * 2 * Math.PI - Math.PI / 2
          const left = 50 + radius * Math.cos(angle)
          const top = 50 + radius * Math.sin(angle)
          return (
            <motion.div
              key={row.year + row.title}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 14 }}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <span
                className="flex size-8 items-center justify-center rounded-full shadow-sm"
                style={{ backgroundColor: isReturn ? accent[500] : neutral[700] }}
              >
                {isReturn ? (
                  <Sunrise className="size-4 text-white" />
                ) : (
                  <Skull className="size-4 text-white" />
                )}
              </span>
              <span
                className="mt-1 text-[11px] font-semibold"
                style={{ color: isReturn ? accent[700] : neutral[700] }}
              >
                {row.year}
              </span>
            </motion.div>
          )
        })}
      </div>

      <ol className="w-full max-w-md space-y-1.5 overflow-y-auto text-xs">
        {data.map((row) => {
          const isReturn = row.type === 'retorno'
          return (
            <li key={row.year + row.title} className="flex gap-2">
              <span
                className="mt-0.5 size-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: isReturn ? accent[500] : neutral[700] }}
              />
              <span>
                <span className="font-semibold" style={{ color: isReturn ? accent[700] : neutral[700] }}>
                  {row.year} · {row.title}:
                </span>{' '}
                {row.event}
              </span>
            </li>
          )
        })}
      </ol>

      <p className="text-center text-xs text-muted-foreground">
        Preto = queda/quase-morte · dourado = retorno. O padrão se fecha em ciclo 3 vezes em 22
        anos — não é um caso isolado.
      </p>
    </div>
  )
}
