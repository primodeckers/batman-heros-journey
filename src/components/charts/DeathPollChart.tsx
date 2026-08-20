import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import type { DeathPollRow } from '@/data/loaders/loadDeathPoll'

/** Símbolo clássico do Batman — preenchido (votos que decidiram) vs contorno. */
function BatIcon({ filled, color }: { filled: boolean; color: string }) {
  return (
    <svg viewBox="0 0 32 20" width="100%" height="100%" aria-hidden="true">
      <path
        d="M16 18.5
           C18.2 13.5 21.5 11 25.5 11
           C24.5 8 25 5 27 2.5
           C23 4 20 7.5 18.5 11
           C17 7.5 16.3 5.5 16 4
           C15.7 5.5 15 7.5 13.5 11
           C12 7.5 9 4 5 2.5
           C7 5 7.5 8 6.5 11
           C10.5 11 13.8 13.5 16 18.5 Z"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth={filled ? 0 : 1.6}
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * A margem de 72 votos é 0,7% de 10.614 — proporção não consegue mostrar
 * isso. Um pictograma dos 10.614 votos precisaria de ~106 votos por ícone,
 * e aí a diferença inteira caberia dentro de um único ícone (o desenho
 * saía 50 a 50, empate visual). Então o pictograma conta a *margem*:
 * 72 morcegos, 1 voto cada, sem arredondamento. As barras embaixo dão o
 * contexto de que os dois lados ficaram praticamente empatados — é a
 * comparação lado a lado que docs/best-practices/selecao-de-graficos.md
 * recomenda pra decisão por margem estreita.
 */
export function DeathPollChart({
  data,
  compact = false,
}: {
  data: DeathPollRow[]
  compact?: boolean
}) {
  const [winner, loser] = [...data].sort((a, b) => b.votes - a.votes)
  const margin = winner.votes - loser.votes
  const total = data.reduce((a, d) => a + d.votes, 0)

  /** Barras na mesma escala (base zero): a parte cinza é o empate técnico
   * entre os dois lados e a dourada é só a margem. */
  const sharedPct = (loser.votes / winner.votes) * 100
  const marginPct = 100 - sharedPct

  const bars = [
    { outcome: winner.outcome, votes: winner.votes, hasMargin: true },
    { outcome: loser.outcome, votes: loser.votes, hasMargin: false },
  ]

  return (
    <div
      className={`flex h-full flex-col items-center justify-center ${compact ? 'gap-3' : 'gap-7'}`}
    >
      <div className={`flex items-center justify-center ${compact ? 'gap-5' : 'gap-10'}`}>
        <div className="flex shrink-0 flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 16 }}
            className={`font-bold ${compact ? 'text-5xl' : 'text-7xl'}`}
            style={{ color: accent[600] }}
          >
            {margin}
          </motion.p>
          <p className={`mt-1 font-medium text-muted-foreground ${compact ? 'text-xs' : 'text-sm'}`}>
            votos de diferença
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div
            className={`grid grid-cols-12 ${compact ? 'gap-1' : 'gap-1.5'}`}
            style={{ width: compact ? 216 : 300 }}
          >
            {Array.from({ length: margin }, (_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.012, duration: 0.25 }}
                className="aspect-[8/5]"
              >
                <BatIcon filled color={accent[500]} />
              </motion.div>
            ))}
          </div>
          <p className={`text-muted-foreground ${compact ? 'text-[10px]' : 'text-xs'}`}>
            cada morcego = 1 voto que decidiu a morte do Robin
          </p>
        </div>
      </div>

      <div className={`w-full ${compact ? 'max-w-sm' : 'max-w-xl'}`}>
        {bars.map((bar, i) => (
          <div
            key={bar.outcome}
            className={`flex items-center gap-3 ${i > 0 ? (compact ? 'mt-1.5' : 'mt-2') : ''}`}
          >
            <span
              className={`shrink-0 text-right text-muted-foreground ${
                compact ? 'w-24 text-[10px]' : 'w-40 text-xs'
              }`}
            >
              {bar.outcome}
            </span>
            <div className="flex min-w-0 flex-1 items-center">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${sharedPct}%` }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className={compact ? 'h-3 rounded-l-sm' : 'h-4 rounded-l-sm'}
                style={{ backgroundColor: neutral[300] }}
              />
              {bar.hasMargin && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${marginPct}%` }}
                  transition={{ duration: 0.4, delay: 0.7, ease: 'easeOut' }}
                  className={compact ? 'h-3 rounded-r-sm' : 'h-4 rounded-r-sm'}
                  style={{ backgroundColor: accent[500] }}
                />
              )}
            </div>
            <span
              className={`shrink-0 font-semibold tabular-nums ${compact ? 'text-[11px]' : 'text-sm'}`}
              style={{ color: bar.hasMargin ? accent[700] : neutral[700] }}
            >
              {bar.votes.toLocaleString('pt-BR')}
            </span>
          </div>
        ))}
        <p
          className={`mt-2 text-center text-muted-foreground ${compact ? 'text-[10px]' : 'text-xs'}`}
        >
          {total.toLocaleString('pt-BR')} ligações em 36 horas (set/1988) — os dois lados empataram
          em {loser.votes.toLocaleString('pt-BR')} votos; a faixa dourada é toda a diferença.
        </p>
      </div>
    </div>
  )
}
