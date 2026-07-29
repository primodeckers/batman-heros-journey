# Arquitetura

## Stack
- **Vite + React + TypeScript** — SPA leve, sem necessidade de SSR/roteamento
  para um dashboard de página única.
- **Visx** (`@visx/visx`) — primitivas de gráfico de baixo nível sobre D3.
  Escolhido em vez de libs "prontas" (Recharts/Nivo/Tremor) porque o projeto
  exige controle fino de cor, saturação, acessibilidade e efeitos — coisas
  mais fáceis de fazer certo quando você monta o gráfico peça por peça.
- **Framer Motion** — transições/animações suaves nas entradas e mudanças de
  dado.
- **d3-scale / d3-scale-chromatic / d3-color / culori** — escalas de cor
  (categóricas, sequenciais perceptualmente uniformes) e verificação de
  contraste/acessibilidade.
- **Tailwind CSS v4** (via `@tailwindcss/vite`) — só para layout/grid/
  tipografia do shell do dashboard; os gráficos em si não usam classes
  utilitárias, são SVG construído via Visx.

## Estrutura de pastas

```
src/
  components/
    charts/     # componentes de gráfico (Visx) — um arquivo por tipo
    layout/     # shell do dashboard: header, grid de seções, footer de fontes
    ui/         # componentes de interface reutilizáveis (KPI card, tags...)
  theme/        # paletas e tokens de cor (palette.ts)
  data/
    loaders/    # fetch/parse dos datasets em public/data/
  hooks/        # hooks reutilizáveis
  types/        # tipos compartilhados (dataset, fonte de dado...)
  utils/        # funções puras (formatação, helpers de acessibilidade)

public/
  data/         # datasets (csv/json) — cada um citado em docs/references/

docs/
  architecture.md
  references/         # bibliografia e fontes de dados citadas
  best-practices/      # cor/acessibilidade, Gestalt, seleção de gráfico, checklist
```

## Convenções
- Path alias `@/` aponta para `src/` (configurado em `vite.config.ts` e
  `tsconfig.app.json`).
- Nenhuma lógica de fetch/parse de dado dentro de componentes visuais —
  sempre via `src/data/loaders/`, retornando dados já tipados.
- Toda cor usada em gráfico vem de `src/theme/palette.ts` — não hardcodear
  hex dentro de um componente de gráfico.
- Ver `docs/best-practices/checklist-narrativo.md` antes de considerar uma
  visualização "pronta".

## Decisões em aberto
- Tema/pergunta central: **ainda não definido**.
- Paleta final (accent + escala categórica): depende do tema.
