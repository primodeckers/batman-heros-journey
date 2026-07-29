import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BentoGrid } from './BentoGrid'

export function DashboardShell() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-6 py-8">
        <header>
          {/* TODO: pergunta central visível (requisito obrigatório, ver WORK_RULES.md) */}
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Pergunta central ainda não definida
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Subtítulo / contexto da narrativa entra aqui.
          </p>
        </header>

        <main className="flex-1">
          <BentoGrid>
            <Card className="lg:col-span-2 lg:row-span-2">
              <CardHeader>
                {/* TODO: título narrativo — afirma uma conclusão, não descreve o eixo */}
                <CardTitle>Visualização de destaque (TODO)</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
                Gráfico principal entra aqui
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visualização 2 (TODO)</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
                Gráfico
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visualização 3 (TODO)</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
                Gráfico
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Visualização 4 (TODO)</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
                Gráfico
              </CardContent>
            </Card>
          </BentoGrid>
        </main>

        <footer className="flex flex-wrap items-center gap-2 border-t pt-4 text-xs text-muted-foreground">
          <span>Fontes:</span>
          {/* TODO: preencher a partir de docs/references/fontes-dados.md */}
          <Badge variant="outline">Fonte 1 (TODO)</Badge>
          <Badge variant="outline">Fonte 2 (TODO)</Badge>
        </footer>
      </div>
    </div>
  )
}
