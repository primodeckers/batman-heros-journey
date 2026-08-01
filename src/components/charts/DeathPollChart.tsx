import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import type { DeathPollRow } from '@/data/loaders/loadDeathPoll'

const ICON_COUNT = 100

/** Pequena silhueta de morcego — ícone original, não é arte de terceiros. */
function BatIcon({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill={fill} aria-hidden="true">
      <path d="M12 3.5 9.3 7.4 4.2 5.6 6.1 9.7 1.8 10.8 6.6 13 4.6 16.3 8.7 15.2 9.6 19.8 12 15.9 14.4 19.8 15.3 15.2 19.4 16.3 17.4 13 22.2 10.8 17.9 9.7 19.8 5.6 14.7 7.4Z" />
    </svg>
  )
}

/**
 * Aloca `total` ícones proporcionalmente aos valores em `values`, usando
 * o método do maior resto — garante que a soma dos ícones bate exatamente
 * com `total` (em vez de arredondamento simples, que pode somar 99 ou
 * 101).
 */
function allocateIcons(values: number[], total: number) {
  const sum = values.reduce((a, b) => a + b, 0)
  const raw = values.map((v) => (v / sum) * total)
  const floors = raw.map(Math.floor)
  let remaining = total - floors.reduce((a, b) => a + b, 0)
  const remainders = raw.map((v, i) => ({ i, frac: v - floors[i] }))
  remainders.sort((a, b) => b.frac - a.frac)
  const result = [...floors]
  for (let k = 0; k < remaining; k++) result[remainders[k].i]++
  return result
}

export function DeathPollChart({ data }: { data: DeathPollRow[] }) {
  const margin = Math.abs(data[0].votes - data[1].votes)
  const total = data.reduce((a, d) => a + d.votes, 0)
  const winnerIdx = data[0].votes >= data[1].votes ? 0 : 1
  const iconCounts = allocateIcons(
    data.map((d) => d.votes),
    ICON_COUNT,
  )

  const icons: { color: string }[] = []
  data.forEach((_, i) => {
    const color = i === winnerIdx ? accent[500] : neutral[300]
    for (let k = 0; k < iconCounts[i]; k++) icons.push({ color })
  })

  return (
    <div className="flex h-full items-center justify-center gap-10">
      <div className="flex w-52 shrink-0 flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 16 }}
          className="text-7xl font-bold"
          style={{ color: accent[600] }}
        >
          {margin}
        </motion.p>
        <p className="mt-1 text-sm font-medium text-muted-foreground">votos de diferença</p>
        <p className="mt-4 text-xs text-muted-foreground">
          Entre {total.toLocaleString('pt-BR')} ligações feitas em 36 horas (set/1988) — os fãs
          escolheram matar o Robin.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-10 gap-1.5" style={{ width: 280 }}>
          {icons.map((icon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.006, duration: 0.25 }}
              className="aspect-square"
            >
              <BatIcon fill={icon.color} />
            </motion.div>
          ))}
        </div>

        <div className="mt-2 flex justify-center gap-4 text-xs">
          {data.map((d, i) => (
            <div key={d.outcome} className="flex items-center gap-1.5">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: i === winnerIdx ? accent[500] : (neutral[300]) }}
              />
              <span className="text-muted-foreground">
                {d.outcome}: <span className="font-semibold text-foreground">{d.votes.toLocaleString('pt-BR')}</span>
              </span>
            </div>
          ))}
        </div>
        <p className="text-center text-[11px] text-muted-foreground">
          Cada morcego representa ~{Math.round(total / ICON_COUNT)} votos
        </p>
      </div>
    </div>
  )
}
