# A Jornada do Batman, em Dados

## Contexto e status

**Este projeto é a entrega oficial da disciplina** — decisão tomada em
01/08/2026. A ideia nasceu de uma pergunta hipotética sobre se dava pra
contar a jornada do herói (Joseph Campbell) de um super-herói com dado
real; virou projeto próprio depois que um spike de 1 gráfico (bilheteria
do Batman) mostrou que o dado sustenta a narrativa bem; e virou a entrega
oficial depois que o professor viu as duas propostas (esta e o Tema A —
GitHub/agentes de código, ver `storytelling-dashboard`) e sinalizou
preferência por esta ("achei a 2 a tua cara, daria pra fazer algo
massa"). O `storytelling-dashboard` fica arquivado como está (9 gráficos,
mapa interativo, tudo funcional) caso seja preciso voltar atrás.

Reaproveita o boilerplate técnico do `storytelling-dashboard` (Vite +
React 19 + TS + Visx + Framer Motion + Tailwind v4 + shadcn/ui manual +
d3-dsv), mas é um repositório e projeto próprios. Regras da disciplina em
`WORK_RULES.md` (mesmo prazo — 20/08/2026 — e mesmos critérios do Tema A).

## Pergunta central (provisória)

**"A jornada do herói de Batman segue o monomito de Campbell — e os dados
provam isso?"**

## Plano de gráficos (estágio de Campbell → dado real → status)

| Estágio | Dado real | Fonte | Status |
| --- | --- | --- | --- |
| Mundo comum / Chamado | 86 anos de marcos em quadrinhos/cinema/TV (1939→2022) | Wikipedia | **Feito** — `AdaptationsTimelineChart` |
| Provação suprema (quadrinhos) | Enquete "A Death in the Family" (1988) — 5.343 × 5.271 votos, margem de 72 | Wikipedia / ComicBook.com / Gizmodo | **Feito** — `DeathPollChart` |
| Provação se repete (quadrinhos) | Linha do tempo 1988→2010: morte, Knightfall (Bane quebra a coluna), ressurreição, R.I.P./Final Crisis, retorno — 3 ciclos morte/retorno em 22 anos | Wikipedia / DC Database / CBR | **Feito** — `ComicsTimelineChart` |
| Morte (cinema) → Ressurreição | Bilheteria/orçamento/RT de *Batman & Robin* (1997) → *Batman Begins* (2005) | Box Office Mojo / Rotten Tomatoes | **Feito** — `BatmanBoxOfficeChart` |
| Recompensa / Retorno com o elixir | Média de bilheteria/RT antes (1989-97) vs. depois (2005-22): +158% bilheteria, 51%→88% RT | Agregado do mesmo CSV do `BatmanBoxOfficeChart` | **Feito** — `EraComparisonCards` |
| Aliados e inimigos | Vilão principal de cada filme + quais voltaram mais de uma vez (Coringa, Duas-Caras, Charada) | Créditos de elenco, Wikipedia | **Feito** — `VillainsTimelineChart` (linha do tempo, não rede — ver nota abaixo) |
| Bônus: o ciclo se repete | Bilheteria de todos os atores (Keaton→Pattinson), ajustada por inflação | Box Office Mojo | Não iniciado |

**6 visualizações prontas e verificadas** (mínimo era 4) — título
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

## Próximos passos (agora que é a entrega oficial)
1. Conferir o checklist final de `WORK_RULES.md` linha por linha antes de
   entregar (pergunta central visível ✅, ≥4 visualizações ✅ temos 6,
   fontes citadas ✅, títulos narrativos ✅, cor intencional ✅).
2. Escrever e ensaiar o roteiro da apresentação de 10 min em torno do
   arco: mundo comum (86 anos) → provações (enquete, ciclos nos
   quadrinhos) → morte no cinema → recompensa/ressurreição. Definir o
   STAR Moment (candidato abaixo) e cronometrar.
3. Revisão visual final (a versão em produção, não só `npm run dev`).
4. Opcional, sem bloquear a entrega: gráfico bônus "o ciclo se repete"
   (bilheteria por ator, ajustada por inflação) — só se sobrar tempo.
5. Considerar criar repositório remoto (GitHub) pra entrega do link —
   hoje o projeto só tem git local.
