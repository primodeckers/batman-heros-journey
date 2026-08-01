import { useState } from 'react'
import { Clapperboard, History, Skull, Sparkles, Swords, TrendingUp } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AdaptationsTimelineChart } from '@/components/charts/AdaptationsTimelineChart'
import { BatmanBoxOfficeChart } from '@/components/charts/BatmanBoxOfficeChart'
import { ComicsTimelineChart } from '@/components/charts/ComicsTimelineChart'
import { DeathPollChart } from '@/components/charts/DeathPollChart'
import { EraComparisonCards } from '@/components/charts/EraComparisonCards'
import { VillainsTimelineChart } from '@/components/charts/VillainsTimelineChart'
import { useAdaptationsTimeline } from '@/hooks/useAdaptationsTimeline'
import { useBatmanBoxOffice } from '@/hooks/useBatmanBoxOffice'
import { useBatmanVillains } from '@/hooks/useBatmanVillains'
import { useComicsTimeline } from '@/hooks/useComicsTimeline'
import { useDeathPoll } from '@/hooks/useDeathPoll'
import { ChartSwitcher, type ChartSwitcherItem } from './ChartSwitcher'

type VizId =
  | 'adaptations'
  | 'deathPoll'
  | 'comicsTimeline'
  | 'boxOffice'
  | 'villains'
  | 'eraComparison'

/** `label` = item curto da barra lateral. `title` = título narrativo
 * completo mostrado no card principal (afirma uma conclusão, não só
 * descreve o eixo — ver docs/best-practices/checklist-narrativo.md). */
const VIZ_ITEMS: (ChartSwitcherItem<VizId> & { title: string })[] = [
  {
    id: 'adaptations',
    label: '86 anos de Batman',
    title: '86 anos depois da estreia em quadrinhos, o Batman ainda está na tela grande',
    icon: Sparkles,
  },
  {
    id: 'deathPoll',
    label: 'Por 72 votos, mataram o Robin',
    title: 'Em 1988, os fãs decidiram por telefone matar o Robin — por uma margem de só 72 votos',
    icon: Skull,
  },
  {
    id: 'comicsTimeline',
    label: 'O padrão se repete nos quadrinhos',
    title: 'Batman "morreu" e voltou 3 vezes em 22 anos de quadrinhos — não foi só uma vez',
    icon: History,
  },
  {
    id: 'boxOffice',
    label: 'Batman quase morreu no cinema',
    title:
      'Batman & Robin (12% no Rotten Tomatoes) quase matou a franquia — Batman Begins a ressuscitou',
    icon: Clapperboard,
  },
  {
    id: 'villains',
    label: 'Os vilões que sempre voltam',
    title: 'Coringa, Duas-Caras e Charada são os únicos vilões que já voltaram mais de uma vez',
    icon: Swords,
  },
  {
    id: 'eraComparison',
    label: 'A recompensa da ressurreição',
    title: 'Depois de quase morrer, o Batman virou 2,6x mais bilheteria e saiu de "podre" pra "certificado fresco"',
    icon: TrendingUp,
  },
]

const SOURCES = [
  { name: 'Box Office Mojo', url: 'https://www.boxofficemojo.com/' },
  { name: 'Rotten Tomatoes', url: 'https://www.rottentomatoes.com/' },
  { name: 'Wikipedia — filmes do Batman', url: 'https://en.wikipedia.org/wiki/Batman_in_film' },
  {
    name: 'A Death in the Family (1988)',
    url: 'https://en.wikipedia.org/wiki/A_Death_in_the_Family_(comics)',
  },
  { name: 'DC Database (Fandom)', url: 'https://dc.fandom.com/wiki/Batman:_Knightfall' },
  { name: 'Wikipedia — Batman (personagem)', url: 'https://en.wikipedia.org/wiki/Batman' },
]

const Loading = <p className="text-sm text-muted-foreground">Carregando…</p>

export function DashboardShell() {
  const [selected, setSelected] = useState<VizId>('adaptations')
  const boxOffice = useBatmanBoxOffice()
  const deathPoll = useDeathPoll()
  const villains = useBatmanVillains()
  const comicsTimeline = useComicsTimeline()
  const adaptations = useAdaptationsTimeline()

  const content: Record<VizId, React.ReactNode> = {
    adaptations: adaptations ? <AdaptationsTimelineChart data={adaptations} /> : Loading,
    deathPoll: deathPoll ? <DeathPollChart data={deathPoll} /> : Loading,
    comicsTimeline: comicsTimeline ? <ComicsTimelineChart data={comicsTimeline} /> : Loading,
    boxOffice: boxOffice ? <BatmanBoxOfficeChart data={boxOffice} /> : Loading,
    villains: villains ? <VillainsTimelineChart data={villains} /> : Loading,
    eraComparison: boxOffice ? <EraComparisonCards data={boxOffice} /> : Loading,
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
            Uma enquete real de 1988, bilheteria e crítica de 86 anos de cinema contam a mesma
            história: provação, morte e ressurreição.
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
