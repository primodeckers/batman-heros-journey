import { User } from 'lucide-react'
import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import type { CategoryCount } from '@/types/data'

const TOTAL_ICONS = 100
const ICON_COLUMNS = 10

/** Distribui `totalIcons` proporcionalmente entre `parts`, garantindo que
 * a soma dê exatamente `totalIcons` (método dos maiores restos). */
function allocateIcons(parts: number[], totalIcons: number) {
  const total = parts.reduce((s, p) => s + p, 0)
  const raw = parts.map((p) => (p / total) * totalIcons)
  const floors = raw.map(Math.floor)
  const remainder = totalIcons - floors.reduce((s, f) => s + f, 0)
  const order = raw
    .map((r, i) => ({ i, frac: r - floors[i] }))
    .sort((a, b) => b.frac - a.frac)
  const result = [...floors]
  for (let k = 0; k < remainder; k++) result[order[k].i]++
  return result
}

function groupAdoption(data: CategoryCount[]) {
  const usesAI = data
    .filter((d) => d.category.startsWith('Yes'))
    .reduce((s, d) => s + d.count, 0)
  const plansTo = data.find((d) => d.category.includes('plan to soon'))?.count ?? 0
  const noPlans = data.find((d) => d.category.includes("don't plan"))?.count ?? 0
  const total = usesAI + plansTo + noPlans
  return { usesAI, plansTo, noPlans, total }
}

export function AIAdoptionPictogram({ data }: { data: CategoryCount[] }) {
  const { usesAI, plansTo, noPlans, total } = groupAdoption(data)
  const [usesIcons, plansIcons] = allocateIcons([usesAI, plansTo, noPlans], TOTAL_ICONS)
  // Mesma base do pictograma (usesIcons já soma certinho em 100) — evita
  // um "78%" no topo que não bate com "79 já usam" na legenda.
  const usesPct = usesIcons

  const iconGroup: ('uses' | 'plans' | 'no')[] = [
    ...Array(usesIcons).fill('uses'),
    ...Array(plansIcons).fill('plans'),
  ]
  while (iconGroup.length < TOTAL_ICONS) iconGroup.push('no')

  return (
    <div className="@container flex h-full flex-col items-center justify-center gap-6">
      <p className="text-4xl font-bold @sm:text-5xl @lg:text-6xl" style={{ color: accent[600] }}>
        {usesPct}%
      </p>
      <div
        className="grid w-full max-w-2xl gap-1.5 @sm:gap-2"
        style={{ gridTemplateColumns: `repeat(${ICON_COLUMNS}, minmax(0, 1fr))` }}
        role="img"
        aria-label={`De cada 100 desenvolvedores, ${usesPct} já usam IA pra programar (diária, semanal ou mensalmente), ${Math.round((plansTo / total) * 100)} não usam mas planejam, e o resto não usa e não planeja`}
      >
        {iconGroup.map((kind, i) => (
          <motion.div
            key={i}
            aria-hidden
            className="aspect-square"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, delay: i * 0.008, ease: 'backOut' }}
          >
            <User
              className="size-full"
              fill={kind === 'uses' ? accent[500] : 'none'}
              color={kind === 'uses' ? accent[600] : kind === 'plans' ? accent[300] : neutral[300]}
              strokeWidth={1.5}
            />
          </motion.div>
        ))}
      </div>
      <p className="max-w-md text-center text-xs text-muted-foreground @sm:text-sm">
        De cada 100 desenvolvedores: <strong>{usesIcons} já usam IA</strong> pra programar,{' '}
        {plansIcons} não usam mas planejam, o resto não usa e não planeja
      </p>
    </div>
  )
}
