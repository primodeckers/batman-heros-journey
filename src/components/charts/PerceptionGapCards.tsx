import { AlertTriangle, ArrowDown, ArrowRight, Brain, ThumbsUp } from 'lucide-react'
import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import type { PerceptionGapPoint } from '@/types/data'

const STAGE_META: Record<string, { icon: typeof Brain; short: string }> = {
  before: { icon: Brain, short: 'Antes de começar' },
  actual: { icon: AlertTriangle, short: 'A realidade' },
  after: { icon: ThumbsUp, short: 'Depois de terminar' },
}

function formatPct(value: number) {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value}%`
}

export function PerceptionGapCards({ data }: { data: PerceptionGapPoint[] }) {
  return (
    <div className="@container flex h-full flex-col items-center justify-center gap-6 px-2">
      <p className="max-w-md text-center text-sm text-muted-foreground">
        Estudo experimental (METR, 2025) com 16 desenvolvedores experientes e
        246 tarefas reais — cada um previu o tempo, depois foi cronometrado.
      </p>

      <div className="flex w-full max-w-3xl flex-col items-center gap-3 @lg:flex-row @lg:items-stretch @lg:gap-2">
        {data.map((point, i) => {
          const isActual = point.stage === 'actual'
          const meta = STAGE_META[point.stage] ?? { icon: Brain, short: point.stage }
          const Icon = meta.icon
          return (
            <div key={point.stage} className="flex items-center gap-2 @lg:flex-1">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.25 }}
                className="flex flex-1 flex-col items-center gap-2 rounded-xl border p-4 text-center @lg:p-5"
                style={
                  isActual
                    ? { borderColor: accent[300], backgroundColor: accent[50] }
                    : { borderColor: neutral[200] }
                }
              >
                <Icon
                  className="size-6"
                  style={{ color: isActual ? accent[600] : neutral[500] }}
                  aria-hidden
                />
                <p
                  className="text-3xl font-bold @sm:text-4xl"
                  style={{ color: isActual ? accent[700] : neutral[700] }}
                >
                  {formatPct(point.effectPct)}
                </p>
                <p className="text-xs font-medium text-muted-foreground @sm:text-sm">
                  {meta.short}
                </p>
                <p className="text-xs text-muted-foreground">{point.label}</p>
              </motion.div>

              {i < data.length - 1 && (
                <ArrowRight
                  className="hidden size-5 shrink-0 text-muted-foreground @lg:block"
                  aria-hidden
                />
              )}
              {i < data.length - 1 && (
                <ArrowDown className="size-5 shrink-0 text-muted-foreground @lg:hidden" aria-hidden />
              )}
            </div>
          )
        })}
      </div>

      <p className="max-w-md text-center text-xs text-muted-foreground">
        Negativo = achavam que ficariam/tinham ficado <strong>mais rápidos</strong>.
        Positivo = na verdade ficaram <strong>mais lentos</strong>.
      </p>
    </div>
  )
}
