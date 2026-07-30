import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CountryRankingChart } from '@/components/charts/CountryRankingChart'
import { ElectricityEquivalenceChart } from '@/components/charts/ElectricityEquivalenceChart'
import { UncertaintyRangeChart } from '@/components/charts/UncertaintyRangeChart'
import { WaterFootprintChart } from '@/components/charts/WaterFootprintChart'
import { useCountryDataCenterRanking } from '@/hooks/useCountryDataCenterRanking'
import { useElectricityEquivalence } from '@/hooks/useElectricityEquivalence'
import { useEnergyUncertaintyRange } from '@/hooks/useEnergyUncertaintyRange'
import { useWaterFootprintEstimate } from '@/hooks/useWaterFootprintEstimate'
import { BentoGrid } from './BentoGrid'

export function DashboardShell() {
  const countryRanking = useCountryDataCenterRanking()
  const uncertaintyRange = useEnergyUncertaintyRange()
  const electricityEquivalence = useElectricityEquivalence()
  const waterFootprint = useWaterFootprintEstimate()

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

        <main className="flex-1">
          <BentoGrid>
            <Card className="lg:col-span-2 lg:row-span-2">
              <CardHeader>
                {/* TODO: título narrativo definitivo (depende do dado real) */}
                <CardTitle>Onde a IA mora (TODO)</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                {countryRanking ? (
                  <CountryRankingChart data={countryRanking} />
                ) : (
                  <p className="text-sm text-muted-foreground">Carregando…</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ninguém sabe o número exato (TODO)</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                {uncertaintyRange ? (
                  <UncertaintyRangeChart data={uncertaintyRange} />
                ) : (
                  <p className="text-sm text-muted-foreground">Carregando…</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Equivale a quantos países (TODO)</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                {electricityEquivalence ? (
                  <ElectricityEquivalenceChart data={electricityEquivalence} />
                ) : (
                  <p className="text-sm text-muted-foreground">Carregando…</p>
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Quanto a IA "bebe" (TODO)</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                {waterFootprint ? (
                  <WaterFootprintChart data={waterFootprint} />
                ) : (
                  <p className="text-sm text-muted-foreground">Carregando…</p>
                )}
              </CardContent>
            </Card>
          </BentoGrid>
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
