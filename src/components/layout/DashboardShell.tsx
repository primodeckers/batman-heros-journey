import { useState } from 'react'
import { BarChart3, Droplet, Gauge, Globe } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AIDataCenterMap } from '@/components/charts/AIDataCenterMap'
import { ElectricityEquivalenceChart } from '@/components/charts/ElectricityEquivalenceChart'
import { RadialUncertaintyGauge } from '@/components/charts/RadialUncertaintyGauge'
import { WaterGlassGauge } from '@/components/charts/WaterGlassGauge'
import { useAIDataCenterMapData } from '@/hooks/useAIDataCenterMapData'
import { useElectricityEquivalence } from '@/hooks/useElectricityEquivalence'
import { useEnergyUncertaintyRange } from '@/hooks/useEnergyUncertaintyRange'
import { useWaterFootprintEstimate } from '@/hooks/useWaterFootprintEstimate'
import { ChartSwitcher, type ChartSwitcherItem } from './ChartSwitcher'

type VizId = 'map' | 'uncertainty' | 'water' | 'equivalence'

const VIZ_ITEMS: ChartSwitcherItem<VizId>[] = [
  { id: 'map', label: 'Onde a IA mora', icon: Globe },
  { id: 'uncertainty', label: 'Ninguém sabe o número exato', icon: Gauge },
  { id: 'water', label: 'Quanto a IA "bebe"', icon: Droplet },
  { id: 'equivalence', label: 'Equivale a quantos países', icon: BarChart3 },
]

const Loading = <p className="text-sm text-muted-foreground">Carregando…</p>

export function DashboardShell() {
  const [selected, setSelected] = useState<VizId>('map')

  const { countries, bubbles } = useAIDataCenterMapData()
  const uncertaintyRange = useEnergyUncertaintyRange()
  const electricityEquivalence = useElectricityEquivalence()
  const waterFootprint = useWaterFootprintEstimate()

  const content: Record<VizId, React.ReactNode> = {
    map:
      countries && bubbles ? <AIDataCenterMap countries={countries} bubbles={bubbles} /> : Loading,
    uncertainty: uncertaintyRange ? <RadialUncertaintyGauge data={uncertaintyRange} /> : Loading,
    water: waterFootprint ? <WaterGlassGauge data={waterFootprint} /> : Loading,
    equivalence: electricityEquivalence ? (
      <ElectricityEquivalenceChart data={electricityEquivalence} />
    ) : (
      Loading
    ),
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Quanto custa pro planeta a explosão de data centers de IA — e por
            que ninguém sabe o número exato?
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Pegada ambiental da inteligência artificial: onde ela mora, o que
            ela consome e o que está por vir.
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
          <Badge variant="outline">IEA (TODO)</Badge>
          <Badge variant="outline">Epoch AI (TODO)</Badge>
          <Badge variant="outline">OWID (TODO)</Badge>
        </footer>
      </div>
    </div>
  )
}
