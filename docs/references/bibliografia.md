# Bibliografia — storytelling de dados, design e acessibilidade

## Pesquisa acadêmica sobre o tema
- Mert Demirer, Leon Musolff & Liyuan Yang — [*Writing Code vs. Shipping Code: Productivity Effects Across Generations of AI Coding Tools*](https://www.nber.org/papers/w35275) (NBER Working Paper 35275, mai/2026; também em [SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6843118)) — MIT/Wharton, dados de mais de 100.000 devs do GitHub com telemetria real de uso de IA (2022-2026). Achado central ("weak-link hypothesis"): o ganho de produtividade da IA é enorme na escrita de código (até +981% em linhas, Claude Code) mas atenua drasticamente até o release final (+10 a +29%), por causa de gargalos humanos (revisão, teste, aprovação). Fonte direta do gráfico "Escrever código não é entregar produto" e do comparativo Claude Code vs. Codex vs. Copilot deste dashboard (dados extraídos da Table 5 do paper). Ainda não passou por peer review (working paper).
- METR — [*Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity*](https://arxiv.org/abs/2507.09089) (jul/2025) — RCT (estudo controlado randomizado) com 16 devs experientes e 246 tarefas reais em seus próprios repositórios. Achado: permitir uso de IA **aumentou** o tempo de conclusão em 19% (IC 95%: +2% a +39%), mas os devs previam uma redução de 24% e, mesmo depois de terminar, ainda achavam que tinham sido 20% mais rápidos. Dataset bruto em [github.com/METR/Measuring-Early-2025-AI-on-Exp-OSS-Devs](https://github.com/METR/Measuring-Early-2025-AI-on-Exp-OSS-Devs). Fonte do card "Achavam que estavam mais rápidos". Nota: a própria METR revisou o desenho do experimento num estudo posterior (fev/2026), com efeitos variando por subgrupo — mantido aqui como evidência de que a percepção de produtividade com IA pode divergir da realidade, não como número universal.
- [Anthropic Economic Index](https://huggingface.co/datasets/Anthropic/EconomicIndex) — dataset público (Hugging Face) com uso do Claude por país, normalizado pela população em idade ativa (`usage_per_capita_index`, 1.0 = média mundial). Fonte do gráfico "Quem mais usa IA no mundo" (o ângulo global/geográfico do dashboard) — Israel lidera com 7x a média mundial; Brasil aparece na posição 69 de 166 países, com índice 0,93 (levemente abaixo da média).

## Storytelling de dados
- Cole Nussbaumer Knaflic — *Storytelling with Data* (2015)
- Nancy Duarte — *DataStory: Explain Data and Inspire Action Through Story* (2019) — foco em estruturar a narrativa dos dados (contexto → conflito → resolução), muito alinhado ao arco pedido em `WORK_RULES.md`
- Duarte — [What Is Data Storytelling?](https://www.duarte.com/resources/communication-skills/what-is-data-storytelling/) — framework de 3 atos (contexto → problema/oportunidade → recomendação) e o conceito de **DataPOV** (ponto de vista claro que enquadra os dados pra audiência); reforça a ideia de título como "observação do dado", não só rótulo
- Alberto Cairo — *The Truthful Art* (2016) e *How Charts Lie* (2019)
- Edward Tufte — *The Visual Display of Quantitative Information* (1983)

## Seleção e design de gráficos
- Storytelling with Data (Cole Nussbaumer Knaflic) — [Chart Guide](https://www.storytellingwithdata.com/chart-guide) — guia com 25+ tipos de gráfico, cada um com página própria sobre quando/como usar; bom complemento ao `selecao-de-graficos.md` deste projeto
- Financial Times — [Visual Vocabulary](https://ft-interactive.github.io/visual-vocabulary/)
- Datawrapper Academy — [blog.datawrapper.de](https://blog.datawrapper.de/category/academy/)
- From Data to Viz — [data-to-viz.com](https://www.data-to-viz.com/)
- Nadieh Bremer & Shirley Wu — *Data Sketches* ([datasketch.es](https://www.datasketch.es/))

## Cor e acessibilidade
- ColorBrewer — [colorbrewer2.org](https://colorbrewer2.org/)
- Okabe & Ito — paleta colorblind-safe ([jfly.uni-koeln.de/color](https://jfly.uni-koeln.de/color/))
- WebAIM — [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Coblis — [Color Blindness Simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/)
- WCAG 2.1 — [Understanding Success Criterion 1.4.3 (Contrast)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

## Percepção visual / Gestalt
- Gestalt Principles — resumo aplicado a UI: [Interaction Design Foundation](https://www.interaction-design.org/literature/topics/gestalt-principles)

## Bibliotecas técnicas
- [Visx docs](https://airbnb.io/visx/) (Airbnb) — primitivas de gráfico sobre D3
- [D3 docs](https://d3js.org/)
- [Framer Motion docs](https://motion.dev/)
- [culori docs](https://culorijs.org/) — manipulação/conversão de cor, útil pra checar contraste programaticamente

---
_Adicionar aqui qualquer fonte extra usada para embasar decisões de design
do dashboard (fica registrado para a apresentação/avaliação por pares)._
