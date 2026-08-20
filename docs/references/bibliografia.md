# Bibliografia — storytelling de dados, design e acessibilidade

## Base conceitual do tema
- Joseph Campbell — *The Hero with a Thousand Faces* (1949) — origem do
  monomito ("Jornada do Herói"): mundo comum → chamado → provações →
  provação suprema (morte e ressurreição) → recompensa → retorno.
- Christopher Vogler — *The Writer's Journey* (1992) — consolidação do
  monomito de Campbell em 12 estágios, mais aplicável a roteiro/narrativa
  moderna.
- Zheng Wei, Huamin Qu e Xian Xu — [*Telling Data Stories with the Hero's
  Journey: Design Guidance for Creating Data
  Videos*](https://xxuxian.github.io/assets/pdf/Vis_24.pdf) — IEEE
  Transactions on Visualization and Computer Graphics, apresentado no IEEE
  VIS 2024. Cópia local em
  [`xu-2024-hero-journey-data-videos.pdf`](./xu-2024-hero-journey-data-videos.pdf).
  Os autores codificaram 48 data videos que seguem a jornada do herói
  (dentre 109 analisados) e derivaram um espaço de design pras 3 macro-fases
  de Campbell — Partida, Iniciação e Retorno — cobrindo narrativa, imagem e
  som. Resumo em português em
  [`resumo-artigo-jornada-do-heroi.md`](./resumo-artigo-jornada-do-heroi.md).
  Nota importante: o artigo é sobre **data videos**, e os autores limitam a
  orientação a narrativas lineares conduzidas pelo autor, com dados de série
  temporal — aplicá-la a um dashboard de múltiplos painéis é extrapolação
  nossa, e é o atrito real a considerar no design deste projeto.

## Storytelling de dados
- Cole Nussbaumer Knaflic — *Storytelling with Data* (2015)
- Nancy Duarte — *DataStory: Explain Data and Inspire Action Through Story*
  (2019) — arco narrativo (contexto → conflito → resolução)
- Nancy Duarte — *Resonate: Present Visual Stories that Transform
  Audiences* (2010) — origem do conceito **STAR Moment** ("Something
  They'll Always Remember"), ver `linguagem-e-clareza.md`
- Brent Dykes — *Effective Data Storytelling: How to Drive Change with
  Data, Narrative, and Visuals* (2019) — linguagem, escala relacionável,
  humanização de números
- Alberto Cairo — *The Truthful Art* (2016) e *How Charts Lie* (2019)
- Edward Tufte — *The Visual Display of Quantitative Information* (1983)

## Seleção e design de gráficos
- Storytelling with Data — [Chart Guide](https://www.storytellingwithdata.com/chart-guide)
- Financial Times — [Visual Vocabulary](https://ft-interactive.github.io/visual-vocabulary/)
- Datawrapper Academy — [blog.datawrapper.de](https://blog.datawrapper.de/category/academy/)
- From Data to Viz — [data-to-viz.com](https://www.data-to-viz.com/)

## Cor e acessibilidade
- ColorBrewer — [colorbrewer2.org](https://colorbrewer2.org/)
- Okabe & Ito — paleta colorblind-safe ([jfly.uni-koeln.de/color](https://jfly.uni-koeln.de/color/))
- WebAIM — [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Coblis — [Color Blindness Simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/)
- WCAG 2.1 — [Understanding Success Criterion 1.4.3 (Contrast)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

## Percepção visual
- Gestalt Principles — [Interaction Design Foundation](https://www.interaction-design.org/literature/topics/gestalt-principles)
- Colin Ware — *Information Visualization: Perception for Design* (2012)
- Don Norman — *The Design of Everyday Things* (1988) — origem do conceito
  de affordance, ver `affordances-visuais.md`

## Bibliotecas técnicas
- [Visx docs](https://airbnb.io/visx/) (Airbnb)
- [D3 docs](https://d3js.org/)
- [Framer Motion docs](https://motion.dev/)
- [culori docs](https://culorijs.org/)

---
_Adicionar aqui qualquer fonte extra usada para embasar decisões de design
do dashboard._
