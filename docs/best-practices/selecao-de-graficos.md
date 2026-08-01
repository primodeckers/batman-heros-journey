# Seleção de gráficos

Escolher o gráfico certo é decidido pela **pergunta** que aquele bloco da
narrativa está respondendo, não pelo que "fica bonito".

| Pergunta que o gráfico responde | Gráfico recomendado |
| --- | --- |
| Como X mudou ao longo do tempo? | Linha (line chart) |
| Como X mudou ao longo do tempo, em partes de um todo? | Área empilhada (com cautela — difícil comparar camadas do meio) |
| Comparar categorias num ponto do tempo | Barra (horizontal se rótulos forem longos) |
| Comparar categorias ao longo do tempo | Linhas múltiplas (máx. ~5-6) ou small multiples |
| Parte de um todo, poucas categorias (≤5) | Barra empilhada única ou donut com cautela |
| Distribuição de uma variável | Histograma / box plot |
| Relação entre duas variáveis numéricas | Dispersão (scatter) |
| Comparar 3 variáveis numéricas | Scatter com tamanho/cor (bubble) — usar com moderação |
| Rede de relações entre entidades | Grafo de rede (com moderação — difícil de ler com muitos nós) |
| Ranking | Barra ordenada (nunca pizza para ranking) |
| Votação/decisão por margem estreita | Barra divergente ou comparação lado a lado das duas opções |

## Evitar
- **Pizza/donut com mais de 4-5 fatias** — comparação de ângulo é
  perceptualmente ruim; vira decoração, não análise.
- **Eixo Y truncado** em barras (não começar em zero) — distorce a magnitude
  da diferença e é considerado prática enganosa.
- **3D em qualquer gráfico** — distorce proporções, sem ganho de leitura.
- **Excesso de KPIs sem contexto** — um KPI sem comparação (vs. período
  anterior, vs. média, vs. meta) não conta uma história.

## Título narrativo vs. rótulo
Cada gráfico precisa de um título que **afirma uma conclusão**, não que só
descreve os eixos.

- ❌ "Bilheteria por filme"
- ✅ "Batman & Robin quase matou a franquia — 12% no Rotten Tomatoes"

O subtítulo/legenda pode conter a descrição técnica (eixo, unidade, período)
— o título é para a conclusão.

## Referências
- Alberto Cairo, *The Truthful Art* / *How Charts Lie*
- Storytelling with Data (Cole Nussbaumer Knaflic) — [Chart Guide](https://www.storytellingwithdata.com/chart-guide)
- Financial Times — [Visual Vocabulary](https://ft-interactive.github.io/visual-vocabulary/)
- Datawrapper Academy — [Chart guides](https://blog.datawrapper.de/category/academy/)
- From Data to Viz — [árvore de decisão de gráfico](https://www.data-to-viz.com/)
