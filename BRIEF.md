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
| Provação suprema (quadrinhos) | Enquete "A Death in the Family" (1988) — 5.343 × 5.271 votos, margem de 72 | Documentado em `docs/references/fontes-dados.md` | Não iniciado |
| Morte (cinema) → Ressurreição | Bilheteria/orçamento/RT de *Batman & Robin* (1997) → *Batman Begins* (2005) | Box Office Mojo / Rotten Tomatoes | **Feito** — `BatmanBoxOfficeChart` |
| Recompensa / Retorno com o elixir | *The Dark Knight* (2008) — bilheteria e crítica recorde | Box Office Mojo / Rotten Tomatoes | Dado já está no CSV, falta destacar narrativamente |
| Aliados e inimigos | Rede de vilões/aliados por filme ou por era | A compilar manualmente (não existe dataset pronto pra Batman, ver `fontes-dados.md`) | Não iniciado |
| Bônus: o ciclo se repete | Bilheteria de todos os atores (Keaton→Pattinson), ajustada por inflação | Box Office Mojo | Não iniciado |

Mínimo de 4 visualizações distintas pra uma narrativa completa — já
cobrimos 2 dos 6 estágios candidatos com 1 gráfico (o de bilheteria conta
2 estágios: morte E ressurreição).

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
1. Verificar visualmente o `BatmanBoxOfficeChart` num navegador de verdade
   (rodar `npm run dev`).
2. Decidir se o projeto vai ter apresentação/entrega própria ou fica só
   como exploração pessoal.
3. Se seguir: montar os gráficos que faltam da tabela acima.
