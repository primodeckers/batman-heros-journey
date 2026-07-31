import { useState } from 'react'
import {
  Bot,
  Braces,
  Briefcase,
  Globe2,
  Layers,
  ShieldQuestion,
  Trophy,
  TrendingUp,
  Users,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AIAdoptionByExperienceChart } from '@/components/charts/AIAdoptionByExperienceChart'
import { AIAdoptionPictogram } from '@/components/charts/AIAdoptionPictogram'
import { AITrustDivergingChart } from '@/components/charts/AITrustDivergingChart'
import { AIVendorRankingChart } from '@/components/charts/AIVendorRankingChart'
import { AIWorldUsageMap } from '@/components/charts/AIWorldUsageMap'
import { LanguageTrendChart } from '@/components/charts/LanguageTrendChart'
import { PerceptionGapCards } from '@/components/charts/PerceptionGapCards'
import { ProductivityAttenuationChart } from '@/components/charts/ProductivityAttenuationChart'
import { ToolComparisonChart } from '@/components/charts/ToolComparisonChart'
import { useAIAdoption } from '@/hooks/useAIAdoption'
import { useAIAdoptionByExperience } from '@/hooks/useAIAdoptionByExperience'
import { useAITrust } from '@/hooks/useAITrust'
import { useAIVendors } from '@/hooks/useAIVendors'
import { useAIWorldMapData } from '@/hooks/useAIWorldMapData'
import { useLanguageTrend } from '@/hooks/useLanguageTrend'
import { usePerceptionGap } from '@/hooks/usePerceptionGap'
import { useProductivityAttenuation } from '@/hooks/useProductivityAttenuation'
import { useToolComparison } from '@/hooks/useToolComparison'
import { ChartSwitcher, type ChartSwitcherItem } from './ChartSwitcher'

type VizId =
  | 'adoption'
  | 'trust'
  | 'languages'
  | 'vendors'
  | 'experience'
  | 'attenuation'
  | 'toolComparison'
  | 'perceptionGap'
  | 'countryUsage'

/** `label` = item curto da barra lateral. `title` = título narrativo
 * completo mostrado no card principal (afirma uma conclusão, não só
 * descreve o eixo — ver docs/best-practices/checklist-narrativo.md). */
const VIZ_ITEMS: (ChartSwitcherItem<VizId> & { title: string })[] = [
  {
    id: 'adoption',
    label: 'Quem já usa IA pra programar',
    title: '79 em cada 100 desenvolvedores já usam IA pra programar',
    icon: Users,
  },
  {
    id: 'trust',
    label: 'Ninguém confia totalmente',
    title: '46% desconfiam da precisão da IA — só 33% confiam nela',
    icon: ShieldQuestion,
  },
  {
    id: 'languages',
    label: 'As linguagens que dispararam',
    title: 'TypeScript cresceu 4,6x desde 2020 — mais que Python e JavaScript',
    icon: TrendingUp,
  },
  {
    id: 'vendors',
    label: 'Qual IA os devs escolheram',
    title: 'OpenAI lidera, mas Claude já é a 2ª IA mais usada por devs',
    icon: Bot,
  },
  {
    id: 'experience',
    label: 'Quem usa mais: novato ou veterano',
    title: 'Devs com 11+ anos de experiência são quem menos usa IA',
    icon: Briefcase,
  },
  {
    id: 'attenuation',
    label: 'Escrever código não é entregar produto',
    title: 'O ganho de produtividade da IA murcha antes de virar produto',
    icon: Layers,
  },
  {
    id: 'toolComparison',
    label: 'Claude Code vs. Codex vs. Copilot',
    title: 'Claude Code entrega muito mais releases que Copilot e Codex',
    icon: Trophy,
  },
  {
    id: 'perceptionGap',
    label: 'Achavam que estavam mais rápidos',
    title: 'Devs se enganam sobre a própria velocidade com IA',
    icon: Braces,
  },
  {
    id: 'countryUsage',
    label: 'Quem mais usa IA no mundo',
    title: 'Israel usa IA 7x mais que a média mundial — o Brasil fica abaixo dela',
    icon: Globe2,
  },
]

const SOURCES = [
  {
    name: 'Stack Overflow Developer Survey 2025',
    url: 'https://github.com/StackExchange/Survey',
  },
  {
    name: 'GitHub Innovation Graph',
    url: 'https://github.com/github/innovationgraph',
  },
  {
    name: 'Demirer, Musolff & Yang (NBER 2026)',
    url: 'https://www.nber.org/papers/w35275',
  },
  {
    name: 'METR (2025)',
    url: 'https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/',
  },
  {
    name: 'Anthropic Economic Index',
    url: 'https://huggingface.co/datasets/Anthropic/EconomicIndex',
  },
]

const Loading = <p className="text-sm text-muted-foreground">Carregando…</p>

export function DashboardShell() {
  const [selected, setSelected] = useState<VizId>('adoption')

  const adoption = useAIAdoption()
  const trust = useAITrust()
  const languages = useLanguageTrend()
  const vendors = useAIVendors()
  const experience = useAIAdoptionByExperience()
  const attenuation = useProductivityAttenuation()
  const toolComparison = useToolComparison()
  const perceptionGap = usePerceptionGap()
  const { countries: worldCountries, usage: countryUsage } = useAIWorldMapData()

  const content: Record<VizId, React.ReactNode> = {
    adoption: adoption ? <AIAdoptionPictogram data={adoption} /> : Loading,
    trust: trust ? <AITrustDivergingChart data={trust} /> : Loading,
    languages: languages ? <LanguageTrendChart data={languages} /> : Loading,
    vendors: vendors ? <AIVendorRankingChart data={vendors} /> : Loading,
    experience: experience ? <AIAdoptionByExperienceChart data={experience} /> : Loading,
    attenuation: attenuation ? <ProductivityAttenuationChart data={attenuation} /> : Loading,
    toolComparison: toolComparison ? <ToolComparisonChart data={toolComparison} /> : Loading,
    perceptionGap: perceptionGap ? <PerceptionGapCards data={perceptionGap} /> : Loading,
    countryUsage:
      worldCountries && countryUsage ? (
        <AIWorldUsageMap countries={worldCountries} usage={countryUsage} />
      ) : (
        Loading
      ),
  }

  const selectedItem = VIZ_ITEMS.find((i) => i.id === selected)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            78% dos programadores já usam IA todo dia — mas a maioria não
            confia nela. Por quê?
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Adoção de IA na programação: quem usa, o que mudou nas
            linguagens, e por que a confiança não acompanhou a adoção.
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
