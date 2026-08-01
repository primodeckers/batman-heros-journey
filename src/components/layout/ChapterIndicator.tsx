import { ChevronLeft, ChevronRight } from 'lucide-react'

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
 * gráficos que dá pra ver em qualquer ordem. Convive com o
 * `ChartSwitcher` lateral, que continua permitindo pular direto pra
 * qualquer gráfico.
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
        <div
          className="absolute top-[13px] left-5 h-0.5 transition-all duration-300"
          style={{
            width: `calc(${progressPct}% * (100% - 2.5rem) / 100)`,
            backgroundColor: accent[600],
          }}
        />

        {items.map((item, i) => {
          const isActive = i === selectedIndex
          const isDone = i < selectedIndex
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(i)}
              className="relative z-10 flex w-[16.6%] flex-col items-center gap-1.5"
              aria-current={isActive ? 'step' : undefined}
            >
              <span
                className={cn(
                  'flex items-center justify-center rounded-full text-xs font-medium transition-all',
                  isActive ? 'size-[30px] -mt-0.5' : 'size-[26px]',
                )}
                style={
                  isActive || isDone
                    ? {
                        backgroundColor: accent[600],
                        color: accent[50],
                        boxShadow: isActive ? `0 0 0 3px ${accent[100]}` : undefined,
                      }
                    : { backgroundColor: neutral[50], border: `1px solid ${neutral[300]}`, color: neutral[500] }
                }
              >
                {i + 1}
              </span>
              <span
                className="text-center text-[11px] leading-tight"
                style={{ color: isActive ? neutral[900] : neutral[500], fontWeight: isActive ? 500 : 400 }}
              >
                {item.chapter}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex justify-between">
        <button
          type="button"
          onClick={() => onSelect(Math.max(0, selectedIndex - 1))}
          disabled={selectedIndex === 0}
          className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft className="size-4" /> Anterior
        </button>
        <button
          type="button"
          onClick={() => onSelect(Math.min(total - 1, selectedIndex + 1))}
          disabled={selectedIndex === total - 1}
          className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
        >
          Próximo <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  )
}
