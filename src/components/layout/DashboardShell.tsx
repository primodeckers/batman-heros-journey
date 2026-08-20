import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { useVizData } from '@/hooks/useVizData'
import { ComicBackground } from './ComicBackground'
import { DashboardGridView } from './DashboardGridView'
import { PresentationView } from './PresentationView'
import { ViewTabs, type ViewMode } from './ViewTabs'
import { METHOD_REFERENCE, SOURCES, type VizId } from './vizConfig'

export function DashboardShell() {
  const [view, setView] = useState<ViewMode>('dashboard')
  const [selected, setSelected] = useState<VizId>('adaptations')
  const data = useVizData()

  const openInPresentation = (id: VizId) => {
    setSelected(id)
    setView('presentation')
  }

  return (
    <div className="relative min-h-screen text-foreground">
      <ComicBackground />
      {/* `h-screen` mantém o dashboard inteiro numa tela só; o min-h evita
          que os gráficos sejam esmagados em telas baixas (aí a página rola). */}
      <div className="relative z-10 mx-auto flex h-screen min-h-[860px] max-w-[1600px] flex-col gap-4 px-6 py-6">
        <header className="flex flex-wrap items-start justify-between gap-3 rounded-md border-2 border-foreground/10 bg-background/85 px-4 py-3 shadow-sm backdrop-blur-sm">
          <div className="min-w-0">
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              A jornada do herói de Batman segue o monomito de Campbell — e os dados provam isso?
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Uma enquete real de 1988, bilheteria e crítica de 86 anos de cinema contam a mesma
              história: provação, morte e ressurreição.
            </p>
          </div>
          <ViewTabs value={view} onChange={setView} />
        </header>

        <main className="flex min-h-0 flex-1 flex-col">
          {view === 'dashboard' ? (
            <DashboardGridView data={data} onOpenInPresentation={openInPresentation} />
          ) : (
            <PresentationView data={data} selected={selected} onSelect={setSelected} />
          )}
        </main>

        <footer className="flex flex-wrap items-center gap-2 rounded-md border-2 border-foreground/10 bg-background/85 px-4 py-2 text-xs text-muted-foreground backdrop-blur-sm">
          <span>Fontes:</span>
          {SOURCES.map((source) => (
            <a key={source.name} href={source.url} target="_blank" rel="noreferrer">
              <Badge variant="outline" className="hover:bg-muted">
                {source.name}
              </Badge>
            </a>
          ))}
          <span className="ml-1 border-l border-foreground/15 pl-3">Método:</span>
          <a href={METHOD_REFERENCE.url} target="_blank" rel="noreferrer">
            <Badge variant="outline" className="hover:bg-muted">
              {METHOD_REFERENCE.name}
            </Badge>
          </a>
        </footer>
      </div>
    </div>
  )
}
