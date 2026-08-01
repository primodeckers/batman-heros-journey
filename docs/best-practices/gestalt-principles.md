# Princípios de Gestalt aplicados a dashboards

A percepção humana agrupa elementos automaticamente antes mesmo de
"pensar" sobre eles. Usar isso a favor do dashboard evita que o usuário
precise de esforço consciente pra entender a estrutura.

## Proximidade
Elementos próximos são percebidos como relacionados. Agrupe KPI + gráfico
que o explica; separe visualmente seções que respondem partes diferentes da
pergunta central (espaçamento generoso entre seções, compacto dentro delas).

## Similaridade
Elementos com a mesma cor/forma são lidos como pertencentes à mesma
categoria. Se uma cor representa uma era/diretor (ex.: filmes do Burton), ela
deve representar a mesma coisa em **todos** os gráficos do dashboard —
consistência de mapeamento cor→categoria é obrigatória.

## Continuidade
O olho segue linhas e sequências contínuas. Em séries temporais, evite
quebrar a linha com elementos que cruzam o traçado; em layouts, alinhe
elementos em grid para criar linhas guia implícitas.

## Fechamento (Closure)
O cérebro completa formas incompletas. Permite simplificar: não é
necessário desenhar toda grade/borda de um gráfico — o olho completa o
retângulo de um card só com espaçamento e alinhamento.

## Figura-fundo
O elemento de destaque (accent) deve se destacar claramente do fundo
(figura) enquanto o resto recua (fundo). É a base técnica do princípio
"cor de destaque no dado-chave, neutros no resto" (ver
`cor-e-acessibilidade.md`).

## Conexão (Common Region)
Elementos dentro de um mesmo contorno/fundo (ex.: um card com borda ou
fundo levemente diferente) são lidos como um grupo — mais forte até que
proximidade. Use isso para "envelopar" KPI + seu contexto/fonte.

## Aplicação prática no projeto
- Grid de layout consistente (`src/components/layout/`) — reforça
  continuidade e proximidade.
- Mapeamento cor↔categoria centralizado em `src/theme/palette.ts` e
  reutilizado por todos os componentes de `src/components/charts/` —
  reforça similaridade.
- Cards (`common region`) para agrupar cada visualização com seu título
  narrativo e sua fonte.
