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

const VIZ_ITEMS: ChartSwitcherItem<VizId>[] = [
  { id: 'adoption', label: 'Quem já usa IA pra programar', icon: Users },
  { id: 'trust', label: 'Ninguém confia totalmente', icon: ShieldQuestion },
  { id: 'languages', label: 'As linguagens que dispararam', icon: TrendingUp },
  { id: 'vendors', label: 'Qual IA os devs escolheram', icon: Bot },
  { id: 'experience', label: 'Quem usa mais: novato ou veterano', icon: Briefcase },
  { id: 'attenuation', label: 'Escrever código não é entregar produto', icon: Layers },
  { id: 'toolComparison', label: 'Claude Code vs. Codex vs. Copilot', icon: Trophy },
  { id: 'perceptionGap', label: 'Achavam que estavam mais rápidos', icon: Braces },
  { id: 'countryUsage', label: 'Quem mais usa IA no mundo', icon: Globe2 },
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
              {/* TODO: título narrativo definitivo (depende do dado real) */}
              <CardTitle>{VIZ_ITEMS.find((i) => i.id === selected)?.label} (TODO)</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">{content[selected]}</CardContent>
          </Card>

          <ChartSwitcher items={VIZ_ITEMS} selected={selected} onSelect={setSelected} />
        </main>

        <footer className="flex flex-wrap items-center gap-2 border-t pt-4 text-xs text-muted-foreground">
          <span>Fontes:</span>
          {/* TODO: preencher a partir de docs/references/fontes-dados.md */}
          <Badge variant="outline">Stack Overflow Developer Survey 2025 (TODO)</Badge>
          <Badge variant="outline">GitHub Innovation Graph (TODO)</Badge>
        </footer>
      </div>
    </div>
  )
}
