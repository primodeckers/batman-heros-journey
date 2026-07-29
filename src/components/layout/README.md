# layout/

Estrutura visual do dashboard: layout bento em tela única (sem menu/
sidebar), com um card de destaque maior cercado de cards menores.

- `DashboardShell.tsx` — página inteira: header com pergunta central, grid
  bento, footer com fontes.
- `BentoGrid.tsx` — container de grid responsivo usado pelo shell.

Sem lógica de gráfico aqui — só composição e layout. Os componentes de
gráfico (`src/components/charts/`) entram dentro dos `Card` do bento.
