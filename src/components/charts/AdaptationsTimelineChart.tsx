import { motion } from 'framer-motion'
import { BookOpen, Film, Tv } from 'lucide-react'

import { accent, neutral } from '@/theme/palette'
import { asset } from '@/utils/asset'
import type { AdaptationRow } from '@/data/loaders/loadAdaptationsTimeline'
import { ThemeSongButton } from './ThemeSongButton'

const MEDIUM_ICON = { Quadrinho: BookOpen, Cinema: Film, TV: Tv } as const

/** Marco da linha do tempo que vira botão de trilha na apresentação.
 * Os arquivos moram em `public/audio/`. */
const THEME_SONG_YEAR = 1966
const THEME_SONG_SRC = asset('audio/coringa-2019-danca.mp3')
const THEME_SONG_LABEL = 'Feira da Fruta'

/** `compact` = card do grid do dashboard: sobra pouca largura por marco,
 * então caem as notas e o parágrafo de fechamento e ficam só ano + título. */
export function AdaptationsTimelineChart({
  data,
  compact = false,
}: {
  data: AdaptationRow[]
  compact?: boolean
}) {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="flex items-start">
        {data.map((row, i) => {
          const Icon = MEDIUM_ICON[row.medium]
          const gap = i > 0 ? row.year - data[i - 1].year : null
          return (
            <div key={row.year + row.title} className="flex min-w-0 flex-1 items-start">
              {gap !== null && (
                <div
                  className={`flex shrink-0 flex-col items-center ${
                    compact ? 'w-4 pt-[13px]' : 'w-8 pt-[17px] sm:w-12'
                  }`}
                >
                  <span className="whitespace-nowrap text-[10px] text-muted-foreground">
                    {gap}a
                  </span>
                  <div className="h-0.5 w-full" style={{ backgroundColor: neutral[200] }} />
                </div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex min-w-0 flex-1 flex-col items-center text-center"
              >
                {row.year === THEME_SONG_YEAR ? (
                  <ThemeSongButton
                    src={THEME_SONG_SRC}
                    title={THEME_SONG_LABEL}
                    compact={compact}
                  >
                    <Icon
                      className={compact ? 'size-4' : 'size-5'}
                      style={{ color: accent[700] }}
                    />
                  </ThemeSongButton>
                ) : (
                  <span
                    className={`flex items-center justify-center rounded-full border-2 ${
                      compact ? 'size-8' : 'size-10'
                    }`}
                    style={{ borderColor: accent[500], backgroundColor: accent[50] }}
                  >
                    <Icon
                      className={compact ? 'size-4' : 'size-5'}
                      style={{ color: accent[700] }}
                    />
                  </span>
                )}
                <p
                  className={`mt-2 font-semibold ${compact ? 'text-xs' : 'text-sm'}`}
                  style={{ color: accent[800] }}
                >
                  {row.year}
                </p>
                <p className={`font-medium ${compact ? 'text-[11px] leading-tight' : 'text-xs'}`}>
                  {row.title}
                </p>
                {!compact && (
                  <>
                    <p className="text-muted-foreground text-[11px]">({row.medium})</p>
                    <p className="text-muted-foreground mt-1 text-xs leading-snug">{row.note}</p>
                  </>
                )}
              </motion.div>
            </div>
          )
        })}
      </div>
      {!compact && (
        <p className="text-center text-sm text-muted-foreground">
          86 anos entre a estreia em quadrinhos (1939) e o filme mais recente (2022) — poucos
          personagens de ficção atravessam tantas gerações e mídias sem parar de ser relevantes.
        </p>
      )}
    </div>
  )
}
