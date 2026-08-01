# A Jornada do Batman, em Dados

## Contexto e status

Este é um **projeto separado** do `storytelling-dashboard` (o trabalho
final da disciplina, que segue com o Tema A — GitHub/agentes de código
sem alteração). A ideia nasceu de uma pergunta hipotética sobre se dava
pra contar a jornada do herói (Joseph Campbell) de um super-herói com
dado real, e virou projeto próprio depois que um spike de 1 gráfico
(bilheteria do Batman) mostrou que o dado sustenta a narrativa bem.

Reaproveita o boilerplate técnico do `storytelling-dashboard` (Vite +
React 19 + TS + Visx + Framer Motion + Tailwind v4 + shadcn/ui manual +
d3-dsv), mas é um repositório e projeto próprios.

## Pergunta central (provisória)

**"A jornada do herói de Batman segue o monomito de Campbell — e os dados
provam isso?"**

## Plano de gráficos (estágio de Campbell → dado real → status)

| Estágio | Dado real | Fonte | Status |
| --- | --- | --- | --- |
| Mundo comum / Chamado | 1ª aparição (*Detective Comics* #27, 1939) | Wikipedia | Não iniciado |
| Provação suprema (quadrinhos) | Enquete "A Death in the Family" (1988) — 5.343 × 5.271 votos, margem de 72 | Wikipedia / ComicBook.com / Gizmodo | **Feito** — `DeathPollChart` |
| Provação se repete (quadrinhos) | Linha do tempo 1988→2010: morte, Knightfall (Bane quebra a coluna), ressurreição, R.I.P./Final Crisis, retorno — 3 ciclos morte/retorno em 22 anos | Wikipedia / DC Database / CBR | **Feito** — `ComicsTimelineChart` |
| Morte (cinema) → Ressurreição | Bilheteria/orçamento/RT de *Batman & Robin* (1997) → *Batman Begins* (2005) | Box Office Mojo / Rotten Tomatoes | **Feito** — `BatmanBoxOfficeChart` |
| Recompensa / Retorno com o elixir | Média de bilheteria/RT antes (1989-97) vs. depois (2005-22): +158% bilheteria, 51%→88% RT | Agregado do mesmo CSV do `BatmanBoxOfficeChart` | **Feito** — `EraComparisonCards` |
| Aliados e inimigos | Vilão principal de cada filme + quais voltaram mais de uma vez (Coringa, Duas-Caras, Charada) | Créditos de elenco, Wikipedia | **Feito** — `VillainsTimelineChart` (linha do tempo, não rede — ver nota abaixo) |
| Bônus: o ciclo se repete | Bilheteria de todos os atores (Keaton→Pattinson), ajustada por inflação | Box Office Mojo | Não iniciado |

**5 visualizações prontas e verificadas** (mínimo era 4) — título
narrativo, build limpo, dado real conferido, sem erro de console. O bônus
"ciclo se repete por ator" fica como próximo passo opcional.

**Nota sobre o gráfico bônus (bilheteria por ator ajustada por
inflação):** pesquisado mas **não construído** — as fontes encontradas
(ScreenRant, Box Office Mojo) divergem sobre metodologia (doméstico vs.
mundial ajustado) e não fecham um conjunto limpo pros 8 filmes. Preferimos
não montar gráfico com números que não bateram entre si — ver
`fontes-dados.md`.

**Nota sobre "aliados e inimigos":** não existe dataset de rede de
coaparições pronto pra Batman/DC (só existe pra Marvel, ver
`fontes-dados.md`). Em vez de forçar uma rede sem dado real por trás,
optamos por uma linha do tempo honesta de vilão×ano×ator — menos
sofisticada tecnicamente, mas 100% sustentada por dado real e verificável.

## STAR Moment candidato

"Por 72 votos, os fãs escolheram matar o Robin" — ver
`docs/best-practices/linguagem-e-clareza.md`.

## Decisões de design já tomadas
- Accent = dourado do símbolo do morcego (`src/theme/palette.ts`) — não é
  estética arbitrária, é a cor que a franquia já usa (ver
  `docs/best-practices/cor-e-acessibilidade.md`).
- Reaproveitados todos os docs de boas práticas do `storytelling-dashboard`
  (Gestalt, affordances, atributos pré-atentivos, linguagem/clareza),
  adaptados pros exemplos deste projeto.

## Próximos passos
1. Ver os 4 gráficos rodando num navegador de verdade (`npm run dev` →
   `localhost:5174`) — a verificação automatizada confirmou dado e título
   corretos, mas não substitui olhar de verdade.
2. Decidir se o projeto vai ter apresentação/entrega própria ou fica só
   como exploração pessoal.
3. Opcional: gráfico bônus "o ciclo se repete" (bilheteria por ator,
   ajustada por inflação).
