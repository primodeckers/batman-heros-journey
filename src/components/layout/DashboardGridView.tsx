import { motion } from 'framer-motion'
import { Maximize2 } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { VizData } from '@/hooks/useVizData'
import { VizContent } from './VizContent'
import { VIZ_ITEMS, type VizId } from './vizConfig'

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
      {VIZ_ITEMS.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.06, duration: 0.35 }}
          className="group/card flex min-h-0"
        >
          <Card className="comic-panel flex min-h-0 w-full flex-col gap-2 overflow-hidden rounded-md py-3">
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
      ))}
    </div>
  )
}
