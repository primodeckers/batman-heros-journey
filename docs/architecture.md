# Arquitetura

## Tema e pergunta central

**Tema: pegada ambiental da IA.** Pergunta central: "Quanto custa pro
planeta a explosão de data centers de IA — e por que ninguém sabe o número
exato?" Análise completa das fontes de dado e alternativas descartadas em
`docs/temas-candidatos.md`.

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
- **Tailwind CSS v4** (via `@tailwindcss/vite`) — layout/grid/tipografia do
  shell do dashboard; os gráficos em si não usam classes utilitárias, são
  SVG construído via Visx.
- **shadcn/ui** (Radix UI + CVA) — componentes de UI (`Card`, `Badge`,
  `Button`) copiados para `src/components/ui/`, não instalados como
  dependência fechada — dá controle total pra customizar depois. Configurado
  manualmente (ver nota abaixo) em vez de via `npx shadcn add`.

## Layout: visualizador principal + barra de seleção

Primeira versão foi um grid bento (destaque + cards menores todos visíveis
ao mesmo tempo) — abandonado porque gráficos mais elaborados (o gauge
radial, por exemplo) ficavam ilegíveis em card pequeno. Layout atual:
**um card grande central** mostra o gráfico selecionado, e uma **barra de
seleção** (lateral em telas grandes, linha horizontal no mobile) com os 4
itens permite escolher qual jogar pro centro. Pensado pra apresentação ao
vivo — clicar, explicar, clicar no próximo — em vez de tentar mostrar tudo
ao mesmo tempo em miniatura.

Implementado em `src/components/layout/DashboardShell.tsx` (estado da
seleção via `useState`, os 4 hooks de dado carregam em paralelo desde o
início — trocar de aba é instantâneo) + `ChartSwitcher.tsx` (componente
genérico da barra de seleção).

Ainda sem menu/sidebar de *navegação* no sentido de páginas — é tudo uma
página só, só o *conteúdo em foco* que muda.

## Nota: shadcn CLI quebra neste ambiente (Windows)

`npx shadcn add ...` falha com `EPERM: operation not permitted, scandir
'...\Documents\Meus Vídeos'` — a pasta é uma junction protegida do Windows
(ACL de DENY) e o CLI do shadcn faz uma varredura que tromba nela. Não
mexer na ACL dessa pasta (é proteção do próprio Windows). Enquanto isso não
for corrigido upstream, novos componentes shadcn devem ser adicionados
manualmente: copiar o código-fonte do componente (do repositório oficial
ui.shadcn.com) para `src/components/ui/`, seguindo o padrão de
`button.tsx`/`card.tsx`/`badge.tsx` já presentes (usam `cn()` de
`src/lib/utils.ts` e variáveis CSS de `src/index.css`).

## Nota: gráficos em branco no preview automatizado

Os componentes de gráfico usam `@visx/responsive`'s `ParentSize`
(`ResizeObserver` por baixo) pra saber o tamanho disponível. Se o preview
for inspecionado por uma ferramenta automatizada com o painel do navegador
**não visível/não composto na tela**, o `ResizeObserver` não dispara e os
gráficos ficam em branco (sem erro nenhum no console — os dados carregam
normal, só o SVG não recebe dimensão). Não é bug do código: abrir/mostrar
o painel resolve. Confirmado testando `ResizeObserver` isolado numa div
qualquer nesse cenário — zero callbacks disparados enquanto o painel não
está visível.

## Estrutura de pastas

```
src/
  components/
    charts/     # componentes de gráfico (Visx) — um arquivo por tipo
    layout/     # shell do dashboard: DashboardShell, ChartSwitcher
    ui/         # componentes shadcn/ui (button, card, badge...)
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
- Paleta final (accent + escala categórica, incluindo `--chart-1..5` em
  `src/index.css`): ainda não definida.
- Datasets finais (IEA .Stat, Epoch AI, OWID Energy, Kaggle) ainda
  precisam ser baixados/tratados — ver `docs/references/fontes-dados.md`.
