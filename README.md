# A Jornada do Batman, em Dados

Dashboard narrativo pra disciplina de Storytelling de Dados. Pergunta
central: **a jornada do herói de Batman segue o monomito de Joseph
Campbell — e os dados provam isso?**

Trabalho final, valor 6 pontos, entrega até **20/08/2026** — ver
[`WORK_RULES.md`](./WORK_RULES.md) pras regras completas e
[`BRIEF.md`](./BRIEF.md) pro plano narrativo/estágios do monomito.

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5174`. Build de produção com `npm run build`.

## Navegação

O dashboard tem uma pergunta central fixa no topo e uma barra lateral
("switcher") com 6 visualizações — cada uma com um título que já afirma
uma conclusão, não só descreve o gráfico. Clique em qualquer item da
barra lateral pra trocar de visualização; as fontes de dado ficam
sempre visíveis no rodapé.

| Visualização | O que mostra | Tipo de gráfico |
| --- | --- | --- |
| 86 anos de Batman | Linha do tempo horizontal de marcos em quadrinhos, cinema e TV (1939→2022) | Timeline horizontal (stepper) |
| Por 72 votos, mataram o Robin | Enquete real de 1988 que decidiu matar o Robin nos quadrinhos | Barras comparativas |
| O padrão se repete nos quadrinhos | 3 ciclos de morte/retorno em 22 anos de história editorial | Diagrama circular |
| Batman quase morreu no cinema | Bilheteria e nota crítica de cada filme (1989-2022) | Barras coloridas por métrica |
| Os vilões que sempre voltam | Vilão de cada filme e quais reapareceram | Linha do tempo com pontos conectados |
| A recompensa da ressurreição | Comparação de bilheteria/crítica antes vs. depois da quase-cancelamento de 1997 | Cards estatísticos |

## Tecnologias usadas

- **[Vite](https://vite.dev/)** + **React 19** + **TypeScript**
- **[Visx](https://airbnb.io/visx/)** (Airbnb) — primitivas de gráfico sobre D3, usado nas visualizações em SVG
- **[Framer Motion](https://motion.dev/)** — animações de entrada/transição
- **[Tailwind CSS v4](https://tailwindcss.com/)** (`@tailwindcss/vite`) — inclui container queries nativas
- **shadcn/ui** (Button, Card, Badge) — componentes copiados como código-fonte, não via CLI
- **d3-dsv** — parsing dos CSVs de dado
- **lucide-react** — ícones

Decisões de arquitetura e paleta estão comentadas diretamente em
`src/theme/palette.ts` e `src/components/layout/`.

## Dados e fontes

Todo dado usado é real e citado — cada CSV em `public/data/` corresponde
a uma linha na tabela de fontes abaixo. Detalhes completos, incluindo
ressalvas metodológicas e fontes que foram pesquisadas mas descartadas
por inconsistência, estão em
[`docs/references/fontes-dados.md`](./docs/references/fontes-dados.md).

| Fonte | Dataset | Arquivo |
| --- | --- | --- |
| [Box Office Mojo](https://www.boxofficemojo.com/) | Bilheteria mundial de cada filme do Batman (1989-2022) | `public/data/batman-boxoffice.csv` |
| [Rotten Tomatoes](https://www.rottentomatoes.com/) | Nota do Tomatometer de cada filme | `public/data/batman-boxoffice.csv` |
| [Wikipedia — Batman in film](https://en.wikipedia.org/wiki/Batman_in_film) | Orçamento de produção; vilão e ator de cada filme | `public/data/batman-boxoffice.csv`, `public/data/batman-villains.csv` |
| [Wikipedia — A Death in the Family](https://en.wikipedia.org/wiki/A_Death_in_the_Family_(comics)) | Resultado da enquete telefônica de 1988 (5.343 × 5.271 votos) | `public/data/batman-death-poll.csv` |
| [DC Database (Fandom) — Knightfall](https://dc.fandom.com/wiki/Batman:_Knightfall) | Bane quebra a coluna do Batman (*Batman* #497, 1993) | `public/data/batman-comics-timeline.csv` |
| [Wikipedia — Under the Hood](https://en.wikipedia.org/wiki/Batman:_Under_the_Hood) | Ressurreição de Jason Todd (2005) | `public/data/batman-comics-timeline.csv` |
| [CBR — The Return of Bruce Wayne](https://www.cbr.com/batman-bruce-wayne-return-explainer/) | Batman R.I.P. → Final Crisis → retorno de Bruce Wayne (2008-2010) | `public/data/batman-comics-timeline.csv` |
| [Wikipedia — Batman (personagem)](https://en.wikipedia.org/wiki/Batman) | Marcos de adaptação em quadrinhos/cinema/TV (1939-2022) | `public/data/batman-adaptations-timeline.csv` |

**Base teórica:** Joseph Campbell, *The Hero with a Thousand Faces*
(conceito do monomito); Xu et al., [*Telling Data Stories with the
Hero's Journey*](https://xxuxian.github.io/assets/pdf/Vis_24.pdf) (IEEE
VIS 2024). Bibliografia completa em
[`docs/references/bibliografia.md`](./docs/references/bibliografia.md).

## Documentação do projeto

- [`BRIEF.md`](./BRIEF.md) — contexto, pergunta central, plano de
  gráficos por estágio do monomito, status
- [`WORK_RULES.md`](./WORK_RULES.md) — regras e critérios de avaliação
  da disciplina
- [`docs/best-practices/`](./docs/best-practices/) — Gestalt,
  cor/acessibilidade, seleção de gráficos, affordances visuais,
  atributos pré-atentivos, linguagem e clareza
- [`docs/references/`](./docs/references/) — fontes de dados e
  bibliografia completas

## Histórico

Este repositório era o `storytelling-dashboard` (um tema diferente,
sobre adoção de IA na programação) e foi renomeado depois que o
professor sinalizou preferência pelo tema do Batman. O histórico de
commits do tema anterior foi preservado — ver os commits mais antigos no
`git log` se quiser consultar.
