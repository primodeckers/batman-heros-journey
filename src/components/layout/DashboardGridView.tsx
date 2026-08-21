import { motion } from 'framer-motion'
import { Maximize2 } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { VizData } from '@/hooks/useVizData'
import { asset } from '@/utils/asset'
import { VizContent } from './VizContent'
import { VIZ_ITEMS, type VizId } from './vizConfig'

/** Número de colunas/linhas do grid completo — só bate com a realidade no
 * breakpoint `xl` (`xl:grid-cols-3 xl:grid-rows-2`); nas telas menores a
 * marca d'água some, porque o recorte só faz sentido no 3x2 inteiro. */
const GRID_COLS = 3
const GRID_ROWS = 2

/** Painel completo: as seis visualizações numa tela só, na ordem da jornada.
 * O número + o nome do capítulo mantêm a leitura sequencial mesmo sem o
 * folhear da apresentação. */
export function DashboardGridView({
  data,
  onOpenInPresentation,
}: {
  data: VizData
  onOpenInPresentation: (id: VizId) => void
}) {
  return (
    <div className="grid min-h-0 flex-1 auto-rows-[minmax(300px,1fr)] grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-2">
      {VIZ_ITEMS.map((item, index) => {
        const col = index % GRID_COLS
        const row = Math.floor(index / GRID_COLS)
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.35 }}
            className="group/card flex min-h-0"
          >
            <Card className="comic-panel relative z-0 flex min-h-0 w-full flex-col gap-2 overflow-hidden rounded-md py-3">
              {/* Easter egg: os 6 cards juntos formam o símbolo do Batman —
                  cada um só mostra o pedacinho que lhe cabe do emblema,
                  quase invisível de propósito (bem clarinho, pra notar só
                  quem prestar atenção). O recorte só bate certo no grid 3x2
                  completo, então some abaixo do breakpoint xl. */}
              {/* Respiração: o símbolo some por completo e reaparece (0% a
                  9% de opacidade, ciclo de 8s). Só a opacidade anima: escala
                  deslocaria cada fatia pro centro do próprio card e o
                  encaixe do símbolo entre os cards quebraria. Como os seis
                  cards montam no mesmo render, os pulsos ficam em sincronia
                  e o símbolo inteiro respira junto. */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 hidden xl:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.09, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  backgroundImage: `url(${asset('/bat-symbol-mark.png')})`,
                  backgroundSize: `${GRID_COLS * 100}% ${GRID_ROWS * 100}%`,
                  backgroundPosition: `${(col / (GRID_COLS - 1)) * 100}% ${(row / (GRID_ROWS - 1)) * 100}%`,
                  backgroundRepeat: 'no-repeat',
                }}
              />
              <CardHeader className="px-4">
                <div className="flex items-start gap-2">
                  <span className="mt-px flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-[11px] font-semibold">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                      {item.chapter}
                    </p>
                    <CardTitle className="mt-0.5 text-[13px] leading-snug">
                      {item.gridTitle}
                    </CardTitle>
                  </div>
                  <button
                    onClick={() => onOpenInPresentation(item.id)}
                    aria-label={`Abrir "${item.label}" no modo apresentação`}
                    className="shrink-0 rounded-sm p-1 text-muted-foreground opacity-0 transition hover:bg-muted hover:text-foreground focus-visible:opacity-100 group-hover/card:opacity-100"
                  >
                    <Maximize2 className="size-3.5" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="min-h-0 flex-1 px-4 pb-1">
                <VizContent id={item.id} data={data} compact />
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
