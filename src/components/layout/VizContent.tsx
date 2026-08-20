import { AdaptationsTimelineChart } from '@/components/charts/AdaptationsTimelineChart'
import { BatmanBoxOfficeChart } from '@/components/charts/BatmanBoxOfficeChart'
import { ComicsTimelineChart } from '@/components/charts/ComicsTimelineChart'
import { DeathPollChart } from '@/components/charts/DeathPollChart'
import { EraComparisonCards } from '@/components/charts/EraComparisonCards'
import { VillainsTimelineChart } from '@/components/charts/VillainsTimelineChart'
import type { VizData } from '@/hooks/useVizData'
import type { VizId } from './vizConfig'

const Loading = <p className="text-sm text-muted-foreground">Carregando…</p>

/** `compact` encolhe o gráfico pros cards do grid do dashboard, onde cada
 * um tem cerca de um terço da largura e metade da altura da apresentação. */
export function VizContent({
  id,
  data,
  compact = false,
}: {
  id: VizId
  data: VizData
  compact?: boolean
}) {
  switch (id) {
    case 'adaptations':
      return data.adaptations ? (
        <AdaptationsTimelineChart data={data.adaptations} compact={compact} />
      ) : (
        Loading
      )
    case 'deathPoll':
      return data.deathPoll ? <DeathPollChart data={data.deathPoll} compact={compact} /> : Loading
    case 'comicsTimeline':
      return data.comicsTimeline ? (
        <ComicsTimelineChart data={data.comicsTimeline} compact={compact} />
      ) : (
        Loading
      )
    case 'boxOffice':
      return data.boxOffice ? (
        <BatmanBoxOfficeChart data={data.boxOffice} compact={compact} />
      ) : (
        Loading
      )
    case 'villains':
      return data.villains ? <VillainsTimelineChart data={data.villains} compact={compact} /> : Loading
    case 'eraComparison':
      return data.boxOffice ? (
        <EraComparisonCards data={data.boxOffice} compact={compact} />
      ) : (
        Loading
      )
  }
}
