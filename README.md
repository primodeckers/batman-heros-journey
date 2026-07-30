# Dashboard Narrativo

Trabalho final — dashboard com dados reais que conta uma história em torno
de uma pergunta central. Ver [`WORK_RULES.md`](./WORK_RULES.md) para os
requisitos completos da entrega.

**Tema:** pegada ambiental da IA.
**Pergunta central:** "Quanto custa pro planeta a explosão de data centers
de IA — e por que ninguém sabe o número exato?"
Ver [`docs/temas-candidatos.md`](./docs/temas-candidatos.md) para a análise
completa que levou a essa escolha.

## Stack
Vite + React + TypeScript · [Visx](https://airbnb.io/visx/) (D3) ·
Framer Motion · Tailwind CSS v4 · shadcn/ui (Radix)

## Layout
Bento em tela única, sem menu/sidebar — um card de destaque maior cercado
de cards menores (ver `src/components/layout/DashboardShell.tsx`).

Ver [`docs/architecture.md`](./docs/architecture.md) para detalhes e
justificativa das escolhas técnicas.

## Rodando localmente

```bash
npm install
npm run dev
```

## Estrutura
- `src/components/charts/` — gráficos (Visx)
- `src/components/layout/` — shell do dashboard
- `src/components/ui/` — componentes de interface
- `src/theme/palette.ts` — paletas de cor (acessíveis, ver docs)
- `src/data/loaders/` — carregamento/parsing de dados
- `public/data/` — datasets
- `docs/best-practices/` — cor/acessibilidade, Gestalt, seleção de gráfico, checklist narrativo
- `docs/references/` — fontes de dados citadas e bibliografia de design

## Antes de considerar uma seção pronta
Ver [`docs/best-practices/checklist-narrativo.md`](./docs/best-practices/checklist-narrativo.md).
