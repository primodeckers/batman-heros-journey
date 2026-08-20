import { useState } from 'react'
import { motion } from 'framer-motion'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { VizData } from '@/hooks/useVizData'
import { CarouselNav } from './CarouselNav'
import { ChapterIndicator } from './ChapterIndicator'
import { ChartSwitcher } from './ChartSwitcher'
import { ComicPageFlip } from './ComicPageFlip'
import { VizContent } from './VizContent'
import { VIZ_ITEMS, type VizId } from './vizConfig'

/** Modo narrativo: um capítulo por vez, folheado como um gibi. É o que
 * guia a apresentação oral de 10 minutos. */
export function PresentationView({
  data,
  selected,
  onSelect,
}: {
  data: VizData
  selected: VizId
  onSelect: (id: VizId) => void
}) {
  const [flipDirection, setFlipDirection] = useState(1)
  const [chartHovered, setChartHovered] = useState(false)

  const selectedIndex = VIZ_ITEMS.findIndex((i) => i.id === selected)
  const selectedItem = VIZ_ITEMS[selectedIndex]

  const handleSelectIndex = (index: number) => {
    const clamped = Math.min(Math.max(index, 0), VIZ_ITEMS.length - 1)
    if (clamped === selectedIndex) return
    setFlipDirection(clamped > selectedIndex ? 1 : -1)
    onSelect(VIZ_ITEMS[clamped].id)
  }

  const handleSelectId = (id: VizId) => {
    handleSelectIndex(VIZ_ITEMS.findIndex((item) => item.id === id))
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 lg:flex-row">
      <Card className="comic-panel flex min-h-[560px] flex-1 flex-col overflow-hidden rounded-md">
        <CardHeader>
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <CardTitle>{selectedItem?.title}</CardTitle>
          </motion.div>
        </CardHeader>
        <div className="px-6 pb-4">
          <ChapterIndicator
            items={VIZ_ITEMS}
            selectedIndex={selectedIndex}
            onSelect={handleSelectIndex}
          />
        </div>
        <div
          className="group/chart relative min-h-0 flex-1 overflow-hidden"
          onMouseEnter={() => setChartHovered(true)}
          onMouseLeave={() => setChartHovered(false)}
          onFocusCapture={() => setChartHovered(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setChartHovered(false)
            }
          }}
        >
          <ComicPageFlip
            pageKey={selected}
            direction={flipDirection}
            className="h-full overflow-hidden"
          >
            <CardContent className="h-full">
              <VizContent id={selected} data={data} />
            </CardContent>
          </ComicPageFlip>
          <CarouselNav
            onPrev={() => handleSelectIndex(selectedIndex - 1)}
            onNext={() => handleSelectIndex(selectedIndex + 1)}
            hasPrev={selectedIndex > 0}
            hasNext={selectedIndex < VIZ_ITEMS.length - 1}
            visible={chartHovered}
          />
        </div>
      </Card>

      <ChartSwitcher items={VIZ_ITEMS} selected={selected} onSelect={handleSelectId} />
    </div>
  )
}
