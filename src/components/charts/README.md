# charts/

Componentes de gráfico construídos com Visx (baixo nível, D3 por baixo).

Convenção: um componente por tipo de gráfico (ex. `BarChart.tsx`, `LineChart.tsx`),
recebendo dados já tratados via props — sem lógica de fetch/parsing aqui
(isso fica em `src/data/`).

Cada gráfico deve:
- Aceitar um título narrativo via prop (não hardcoded)
- Usar as escalas de cor de `src/theme/palette.ts`
- Ser responsivo (usar `@visx/responsive` / `ParentSize`)
- Ter transições via Framer Motion nas entradas/atualizações de dados
