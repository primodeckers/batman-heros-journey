# layout/

Estrutura visual do dashboard: um card principal grande mostra o gráfico
selecionado, e uma barra de seleção (lateral em telas grandes, linha
horizontal no mobile) deixa escolher qual gráfico está em foco.

- `DashboardShell.tsx` — página inteira: header com pergunta central,
  card principal + barra de seleção, footer com fontes. Guarda o estado
  de qual gráfico está selecionado.
- `ChartSwitcher.tsx` — componente genérico da barra de seleção (ícone +
  label por item, estilo ativo usa a cor de destaque de `theme/palette.ts`).

Sem lógica de gráfico aqui — só composição e layout. Os componentes de
gráfico (`src/components/charts/`) entram dentro do card principal.
