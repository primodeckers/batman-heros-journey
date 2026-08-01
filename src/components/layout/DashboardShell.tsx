import { useState } from 'react'
import { Clapperboard } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BatmanBoxOfficeChart } from '@/components/charts/BatmanBoxOfficeChart'
import { useBatmanBoxOffice } from '@/hooks/useBatmanBoxOffice'
import { ChartSwitcher, type ChartSwitcherItem } from './ChartSwitcher'

type VizId = 'boxOffice'

/** `label` = item curto da barra lateral. `title` = título narrativo
 * completo mostrado no card principal (afirma uma conclusão, não só
 * descreve o eixo — ver docs/best-practices/checklist-narrativo.md,
 * copiado do storytelling-dashboard). */
const VIZ_ITEMS: (ChartSwitcherItem<VizId> & { title: string })[] = [
  {
    id: 'boxOffice',
    label: 'Batman quase morreu no cinema',
    title:
      'Batman & Robin (12% no Rotten Tomatoes) quase matou a franquia — Batman Begins a ressuscitou',
    icon: Clapperboard,
  },
]

const SOURCES = [
  { name: 'Box Office Mojo', url: 'https://www.boxofficemojo.com/' },
  { name: 'Rotten Tomatoes', url: 'https://www.rottentomatoes.com/' },
  { name: 'Wikipedia — filmes do Batman', url: 'https://en.wikipedia.org/wiki/Batman_in_film' },
]

const Loading = <p className="text-sm text-muted-foreground">Carregando…</p>

export function DashboardShell() {
  const [selected, setSelected] = useState<VizId>('boxOffice')
  const boxOffice = useBatmanBoxOffice()

  const content: Record<VizId, React.ReactNode> = {
    boxOffice: boxOffice ? <BatmanBoxOfficeChart data={boxOffice} /> : Loading,
  }

  const selectedItem = VIZ_ITEMS.find((i) => i.id === selected)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            A jornada do herói de Batman segue o monomito de Campbell — e os dados provam isso?
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Bilheteria, crítica e uma enquete real de 1988 contam a mesma história: queda, morte e
            ressurreição.
          </p>
        </header>

        <main className="flex flex-1 flex-col gap-4 lg:flex-row">
          <Card className="min-h-[420px] flex-1">
            <CardHeader>
              <CardTitle>{selectedItem?.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">{content[selected]}</CardContent>
          </Card>

          <ChartSwitcher items={VIZ_ITEMS} selected={selected} onSelect={setSelected} />
        </main>

        <footer className="flex flex-wrap items-center gap-2 border-t pt-4 text-xs text-muted-foreground">
          <span>Fontes:</span>
          {SOURCES.map((source) => (
            <a key={source.name} href={source.url} target="_blank" rel="noreferrer">
              <Badge variant="outline" className="hover:bg-muted">
                {source.name}
              </Badge>
            </a>
          ))}
        </footer>
      </div>
    </div>
  )
}
