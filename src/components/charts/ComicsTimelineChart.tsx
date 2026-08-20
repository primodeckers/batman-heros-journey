import { motion } from 'framer-motion'
import { Skull, Sunrise } from 'lucide-react'

import { accent, neutral } from '@/theme/palette'
import type { ComicsTimelineRow } from '@/data/loaders/loadComicsTimeline'

/**
 * Diagrama circular em vez de mais uma linha do tempo: a história aqui
 * (morte -> retorno -> morte -> retorno) é literalmente um ciclo, então o
 * formato reforça o argumento em vez de só listar datas de novo — ver
 * docs/best-practices/selecao-de-graficos.md.
 *
 * Layout lado a lado (não empilhado): com o indicador de capítulo
 * ocupando espaço no topo do card, altura vertical é mais escassa que
 * largura — diagrama + legenda dividindo a largura aproveita melhor o
 * espaço disponível do que diagrama em cima da legenda.
 */
export function ComicsTimelineChart({
  data,
  compact = false,
}: {
  data: ComicsTimelineRow[]
  compact?: boolean
}) {
  const n = data.length
  const radius = 38

  return (
    <div
      className={`flex h-full min-h-0 items-center justify-center ${compact ? 'gap-5' : 'gap-12'}`}
    >
      <div
        className={`relative aspect-square w-full shrink-0 ${
          compact ? 'max-w-[160px]' : 'max-w-[300px]'
        }`}
      >
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
                className={`flex items-center justify-center rounded-full shadow-sm ${
                  compact ? 'size-7' : 'size-10'
                }`}
                style={{ backgroundColor: isReturn ? accent[500] : neutral[700] }}
              >
                {isReturn ? (
                  <Sunrise className={`text-white ${compact ? 'size-3.5' : 'size-5'}`} />
                ) : (
                  <Skull className={`text-white ${compact ? 'size-3.5' : 'size-5'}`} />
                )}
              </span>
              <span
                className={`mt-1.5 font-semibold ${compact ? 'text-[10px]' : 'text-xs'}`}
                style={{ color: isReturn ? accent[700] : neutral[700] }}
              >
                {row.year}
              </span>
            </motion.div>
          )
        })}
      </div>

      <div className="flex h-full max-w-lg min-w-0 flex-col justify-center gap-3">
        <ol className={compact ? 'space-y-1 text-[11px]' : 'space-y-2.5 text-sm'}>
          {data.map((row) => {
            const isReturn = row.type === 'retorno'
            return (
              <li key={row.year + row.title} className="flex gap-2">
                <span
                  className="mt-1.5 size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: isReturn ? accent[500] : neutral[700] }}
                />
                <span>
                  <span
                    className="font-semibold"
                    style={{ color: isReturn ? accent[700] : neutral[700] }}
                  >
                    {row.year} · {row.title}
                    {compact ? '' : ':'}
                  </span>
                  {!compact && <> {row.event}</>}
                </span>
              </li>
            )
          })}
        </ol>

        <p className={compact ? 'text-[11px] text-muted-foreground' : 'text-sm text-muted-foreground'}>
          {compact
            ? 'Preto = queda · dourado = retorno.'
            : 'Preto = queda/quase-morte · dourado = retorno. O padrão se fecha em ciclo 3 vezes em 22 anos — não é um caso isolado.'}
        </p>
      </div>
    </div>
  )
}
