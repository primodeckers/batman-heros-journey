import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import { cn } from '@/lib/utils'

export type ChapterItem = { id: string; chapter: string; durationSec?: number }

type ChapterIndicatorProps = {
  items: ChapterItem[]
  selectedIndex: number
  onSelect: (index: number) => void
}

/** Vermelho de alerta: é cromo de interface pro tempo estourado, não
 * codificação de dado — por isso pode ficar fora da paleta narrativa. */
const OVERTIME = '#dc2626'

const RING_SIZE = 42
const RING_RADIUS = 18
const RING_LENGTH = 2 * Math.PI * RING_RADIUS

function formatClock(seconds: number) {
  const over = seconds < 0
  const abs = Math.abs(seconds)
  const mins = Math.floor(abs / 60)
  const secs = abs % 60
  return `${over ? '+' : ''}${mins}:${String(secs).padStart(2, '0')}`
}

/**
 * Anel que se esvazia ao redor da bolinha do capítulo ativo, no ritmo do
 * tempo reservado pra ele no roteiro. Não tem estado: quem anima é o
 * framer-motion, e a chave reinicia a volta a cada troca de capítulo.
 */
function CountdownRing({ durationSec, runKey }: { durationSec: number; runKey: string }) {
  return (
    <svg
      width={RING_SIZE}
      height={RING_SIZE}
      className="pointer-events-none absolute"
      style={{ transform: 'rotate(-90deg)' }}
      aria-hidden="true"
    >
      <circle
        cx={RING_SIZE / 2}
        cy={RING_SIZE / 2}
        r={RING_RADIUS}
        fill="none"
        stroke={neutral[200]}
        strokeWidth={2.5}
      />
      <motion.circle
        key={runKey}
        cx={RING_SIZE / 2}
        cy={RING_SIZE / 2}
        r={RING_RADIUS}
        fill="none"
        stroke={accent[600]}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={RING_LENGTH}
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: RING_LENGTH }}
        transition={{ duration: durationSec, ease: 'linear' }}
      />
    </svg>
  )
}

/**
 * Relógio isolado num componente próprio de propósito: ele re-renderiza a
 * cada segundo, e deixar isso no indicador inteiro reiniciaria a animação
 * de pulso da bolinha ativa a cada tique.
 */
function ChapterClock({ durationSec, runKey }: { durationSec: number; runKey: string }) {
  const [remaining, setRemaining] = useState(durationSec)

  useEffect(() => {
    setRemaining(durationSec)
    const startedAt = Date.now()
    const id = setInterval(() => {
      setRemaining(durationSec - Math.floor((Date.now() - startedAt) / 1000))
    }, 250)
    return () => clearInterval(id)
  }, [durationSec, runKey])

  const over = remaining < 0

  return (
    <motion.span
      className="tabular-nums font-medium"
      style={{ color: over ? OVERTIME : accent[700] }}
      animate={over ? { opacity: [1, 0.45, 1] } : { opacity: 1 }}
      transition={over ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
    >
      {formatClock(remaining)}
    </motion.span>
  )
}

/**
 * Indicador de capítulo — reforça que o dashboard conta UMA história com
 * começo, meio e fim (a jornada do herói), não uma lista solta de
 * gráficos que dá pra ver em qualquer ordem. O anel regressivo em volta da
 * bolinha ativa mostra quanto resta do tempo previsto pra falar aquele
 * capítulo (ver docs/roteiro-apresentacao.md).
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
        <span className="flex items-center gap-2">
          <span>{current?.chapter}</span>
          {current?.durationSec ? (
            <ChapterClock durationSec={current.durationSec} runKey={current.id} />
          ) : null}
        </span>
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
              <span className="relative flex items-center justify-center">
                {isActive && item.durationSec ? (
                  <CountdownRing durationSec={item.durationSec} runKey={item.id} />
                ) : null}
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
              </span>
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
