import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import { cn } from '@/lib/utils'

export type ChapterItem = { id: string; chapter: string }

type ChapterIndicatorProps = {
  items: ChapterItem[]
  selectedIndex: number
  onSelect: (index: number) => void
}

/**
 * Indicador de capítulo — reforça que o dashboard conta UMA história com
 * começo, meio e fim (a jornada do herói), não uma lista solta de
 * gráficos que dá pra ver em qualquer ordem.
 */
export function ChapterIndicator({ items, selectedIndex, onSelect }: ChapterIndicatorProps) {
  const total = items.length
  const current = items[selectedIndex]
  const progressPct = total > 1 ? (selectedIndex / (total - 1)) * 100 : 0

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Capítulo {selectedIndex + 1} de {total}
        </span>
        <span>{current?.chapter}</span>
      </div>

      <div className="relative mt-3.5 flex items-start justify-between px-2.5">
        <div
          className="absolute top-[13px] right-5 left-5 h-0.5"
          style={{ backgroundColor: neutral[200] }}
        />
        <motion.div
          className="absolute top-[13px] left-5 h-0.5 origin-left"
          initial={false}
          animate={{
            width: `calc(${progressPct}% * (100% - 2.5rem) / 100)`,
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ backgroundColor: accent[600] }}
        />

        {items.map((item, i) => {
          const isActive = i === selectedIndex
          const isPast = i < selectedIndex
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(i)}
              className="relative z-10 flex w-[16.6%] flex-col items-center gap-1.5"
              aria-current={isActive ? 'step' : undefined}
            >
              <motion.span
                className={cn(
                  'relative flex items-center justify-center rounded-full text-xs font-medium',
                  isActive ? 'size-[30px] -mt-0.5' : 'size-[26px]',
                )}
                initial={false}
                animate={
                  isActive
                    ? { scale: [1, 1.12, 1], backgroundColor: accent[600], color: accent[50] }
                    : {
                        scale: 1,
                        backgroundColor: isPast ? accent[100] : neutral[50],
                        color: isPast ? accent[700] : neutral[500],
                      }
                }
                transition={
                  isActive
                    ? { duration: 0.9, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }
                    : { duration: 0.25 }
                }
                style={
                  isActive
                    ? { boxShadow: `0 0 0 3px ${accent[100]}` }
                    : { border: `1px solid ${isPast ? accent[300] : neutral[300]}` }
                }
              >
                {i + 1}
              </motion.span>
              <motion.span
                className="text-center text-[11px] leading-tight"
                initial={false}
                animate={{
                  color: isActive ? neutral[900] : neutral[500],
                  fontWeight: isActive ? 500 : 400,
                }}
                transition={{ duration: 0.25 }}
              >
                {item.chapter}
              </motion.span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
