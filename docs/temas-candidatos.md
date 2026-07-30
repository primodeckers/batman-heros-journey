# Temas candidatos — análise comparativa

> ## ✅ Tema escolhido: E — Pegada ambiental da IA
> **Pergunta central:** "Quanto custa pro planeta a explosão de data
> centers de IA — e por que ninguém sabe o número exato?"
>
> Arco de 3 atos: **contexto** = onde a IA mora (mapa dos data centers,
> Epoch AI) → **evidência** = ninguém sabe o número exato (faixa de
> incerteza das estimativas do IEA/Carbon Brief) → **conclusão** = quanto
> isso vai pesar em 2030, comparado a países reais (OWID Energy).
> Decidido em 29/07/2026. Detalhes completos na seção "Tema E" abaixo.

Documento de apoio pra Fase 1 (`WORK_RULES.md`): comparar os temas em mente
antes de fechar um. Critério principal não é "qual é mais interessante" —
é **qual tem dado real, aberto e baixável o suficiente pra virar 4+
visualizações em ~3 semanas** (hoje: 28/07/2026, entrega: 20/08/2026).

Pesquisei fontes reais pra cada um. Os outros temas (A, B, G) ficam
registrados abaixo como histórico da decisão, não foram apagados.

---

## Tema A — GitHub / linguagens / agentes de codificação de IA (Claude Code, Codex, Copilot, Cursor...)

### O que existe de dado real
- **[Stack Overflow Developer Survey](https://survey.stackoverflow.co/)** —
  ⭐ melhor fonte pra esse tema. Anual, **CSV público baixável**, dezenas de
  milhares de respostas, perguntas diretas sobre uso de ferramentas de IA,
  satisfação, linguagens mais usadas/amadas/odiadas, por país/senioridade.
  Praticamente pronto pra virar dashboard.
- **[GitHub Octoverse](https://github.blog/news-insights/octoverse/)** —
  relatório anual oficial do GitHub. Não é um CSV baixável, mas traz
  números concretos e citáveis (ex.: TypeScript virou a #1 linguagem em
  2025, Copilot adotado por ~80% dos novos devs na 1ª semana, 1,1M+ repos
  importando SDK de LLM, +178% ano a ano). Dá pra transcrever os números
  citados em uma tabela pequena — prática comum, só precisa citar a fonte
  original.
- **[GH Archive](https://www.gharchive.org/)** — todo evento público do
  GitHub desde 2011, consultável via Google BigQuery (tier gratuito). Mais
  poderoso, mas exige SQL/BigQuery — só vale se você quiser ir fundo.
- **GitHub REST/GraphQL API** — sim, é pública (`api.github.com`), sem
  necessidade de autenticação pra dados públicos (60 req/h sem token, 5000
  com token gratuito). Serve pra puxar dado pontual (estrelas, linguagem,
  atividade de um repo específico), não pra estatística agregada do
  ecossistema inteiro — pra isso os relatórios acima são melhores.
- Mercado de agentes de codificação (Claude Code 54% do mercado enterprise,
  Cursor $2B ARR, etc.) vem majoritariamente de **relatórios pagos de
  research firms** (Menlo Ventures, CB Insights) — cita-se como fonte
  secundária, mas não é "dataset baixável".

### Pergunta central candidata
- "Como os agentes de IA mudaram a forma como o mundo programa?" (comparar
  adoção de IA + mudança nas linguagens mais usadas ao longo dos anos)
- "TypeScript ultrapassou Python porque a IA prefere tipagem forte?" (mais
  específica, mais forte como conclusão)

### Avaliação
| Critério | Nota |
| --- | --- |
| Dado real baixável | Alta (Stack Overflow Survey) |
| Riqueza narrativa | Alta — arco temporal claro (antes/depois da IA) |
| Viável em 3 semanas | Alta |
| Ressoa com você | Alta (é a sua área) |

---

## Tema B — Guerra: impacto na economia e no nosso cotidiano/finanças

### O que existe de dado real
- **[Our World in Data — War & Peace](https://ourworldindata.org/war-and-peace)**
  — CSVs baixáveis: mortes em conflito, gasto militar por país/ano,
  número de conflitos ativos ao longo do tempo. Já é fonte sugerida no
  `WORK_RULES.md`.
- **[UCDP](https://ucdp.uu.se/downloads/)** (Uppsala Conflict Data Program)
  — referência mundial em dado de conflito armado, gratuito, CC BY 4.0,
  desde 1979, com API própria também.
- **[SIPRI Military Expenditure Database](https://www.sipri.org/databases/milex)**
  — gasto militar por país/ano, público, baixável.
- **IMF World Economic Outlook Database** — PIB, inflação por país/ano,
  público, baixável — dá pra cruzar com os dados de conflito.
- **Pra conectar com "nosso cotidiano" (Brasil):** IPEA Data / IBGE têm
  série histórica do IPCA (inflação) e preço de combustível/alimentos —
  também fontes sugeridas no `WORK_RULES.md`. Cruzar preço do petróleo/trigo
  no mundo (afetado por guerra) com IPCA brasileiro é uma narrativa forte e
  concreta.

### Pergunta central candidata
- "Quanto da inflação no seu carrinho de compras vem de guerras que
  aconteceram do outro lado do mundo?"
- "O gasto militar mundial cresce mais rápido que a economia?"

### Avaliação
| Critério | Nota |
| --- | --- |
| Dado real baixável | Muito alta (OWID + IBGE/IPEA, ambos sugeridos no trabalho) |
| Riqueza narrativa | Alta — afeta o bolso de quem assiste, bom gancho emocional |
| Viável em 3 semanas | Alta |
| Ressoa com você | Você mencionou, mas com menos detalhe que o Tema A |

---

## Tema E — Pegada ambiental da IA (aprofundado)

### O que existe de dado real
- **[IEA — Key Questions on Energy and AI](https://www.iea.org/reports/key-questions-on-energy-and-ai)**
  (abr/2026) — fonte mais autorizada do tema. Consumo de data centers:
  485 TWh em 2025 → projeção de 950 TWh em 2030 (~3% da eletricidade
  mundial); IA foi 15% da demanda elétrica de data centers em 2024;
  emissões de data centers ~0,5% do CO2 global hoje, mas crescendo — dobra
  até 2035 (~350 milhões de toneladas); pegada de água estimada em
  312,5–764,6 bilhões de litros em 2025.
- **[IEA .Stat Data Explorer](https://www.iea.org/data-and-statistics/data-explorers)**
  — dá pra exportar em CSV/Excel direto (precisa de conta gratuita). Tem o
  gráfico-base "Electricity consumption by data centres, 2020-2035"
  (cenário Base Case) já pronto pra virar um dos gráficos do dashboard.
- **[Epoch AI — AI Data Centers](https://epoch.ai/data/ai-data-centers)** —
  ⭐ achado novo e forte: banco de dados granular (não é só um número
  agregado) rastreando **346 data centers de IA no mundo**, por país e por
  ano de anúncio. EUA lidera disparado (84 instalações), depois Alemanha e
  Índia (11 cada). Epoch AI é referência séria em dado aberto de IA — dá
  pra fazer um mapa/ranking de "onde a IA realmente mora fisicamente".
- **[Kaggle — LLM Energy Consumption Dataset](https://www.kaggle.com/datasets/nitishkumar2k01/llms-energy-consumption-dataset)**
  ("The Hidden Cost of AI") — CSV pronto, mais focado em consumo por
  modelo/inferência individual (bom pra um ângulo "quanto custa 1 prompt").
- **Ressalva importante, e também um ponto de virada narrativo:** não existe
  um dataset global consolidado de consumo/emissão de data centers — poucos
  governos exigem esse reporte. Os números de IA especificamente são
  **estimativas de modelo** (IEA, Carbon Brief) com faixas largas — ex.
  servidores de IA nos EUA usaram entre 53-76 TWh em 2024, com projeção de
  165-326 TWh até 2028 (faixa de quase o dobro de incerteza). Isso é
  ótimo material pra um gráfico "de faixa de incerteza" (uma visualização
  que a maioria dos colegas não vai pensar em fazer).

### Ângulos de pergunta central (mais específicos que antes)
- "Onde a IA realmente mora? Um mapa dos data centers que estão redesenhando
  o consumo de energia do planeta" (foco geográfico, usa Epoch AI)
- "Ninguém sabe quanto a IA gasta de energia — só a faixa de incerteza"
  (foco na limitação do dado, vira parte da própria história)
- "Em 2030 a IA vai consumir mais eletricidade que a Alemanha inteira?"
  (foco comparativo/escala, fácil de visualizar com um KPI de destaque)

### Sugestão de 4 visualizações
1. **Destaque:** linha do tempo 2020→2035 do consumo de eletricidade de
   data centers (IEA), com a faixa de projeção
2. Mapa/ranking de países por nº de data centers de IA (Epoch AI)
3. Comparação do consumo projetado de 2030 vs. consumo elétrico de
   países reais (OWID Energy) — "equivale a X países"
4. Faixa de incerteza das estimativas de consumo de IA (mín-máx, várias
   fontes) — reforça o ponto "isto é estimativa"

### Ideias de visualização animada (efeitos)

Stack permite ir além de gráfico estático — Visx cuida da geometria, Framer
Motion orquestra a animação, `d3-scale-chromatic` cuida da cor. Ideias
concretas em cima dos dados acima, do mais simples ao mais ambicioso:

1. **Mapa-múndi "vivo" com data centers aparecendo no tempo** (dado: Epoch
   AI, 346 instalações com ano de anúncio) — cada data center "nasce" no
   mapa no ano em que foi anunciado, com um pulso/glow ao aparecer. Rodando
   em loop (2015→2026), o mapa vai se enchendo e mostra visualmente onde a
   IA consome energia. Os mais recentes continuam pulsando discretamente
   ("isso ainda tá acontecendo agora").
2. **Contador de equivalência com pictograma enchendo** (dado: projeção
   950 TWh em 2030 vs. consumo de países reais, OWID) — grid de ícones
   (isotype/pictograma) preenchendo progressivamente (stagger no Framer
   Motion) até um texto tipo "equivale a X países inteiros".
3. **Faixa de incerteza "respirando"** (dado: 53-76 TWh em 2024 → 165-326
   TWh em 2028) — a área sombreada entre mínimo e máximo pulsa devagar
   (opacidade oscilando), reforçando visualmente "isto é uma estimativa,
   não um número fixo" sem precisar de texto extra.
4. **Medidor de água enchendo** (dado: pegada de água 312,5–764,6 bilhões
   de litros) — "copo"/gauge em SVG que enche de líquido ao carregar; litros
   são mais palpáveis que TWh.

**Nota técnica:** como o layout é bento em tela única (sem scroll), essas
animações não têm scroll pra disparar — rodam automaticamente ao carregar
(loop lento) ou com botão "play" no card, não por scroll-trigger.

**Recomendação:** #1 (mapa vivo) como card de destaque do bento + #3 (faixa
respirando) num card menor — as duas contam a mesma história central ("a
IA cresceu rápido e ninguém sabe o custo exato") com pouco texto.

### Avaliação
| Critério | Nota |
| --- | --- |
| Dado real baixável | Alta (IEA .Stat + Epoch AI + Kaggle; ressalva: estimativas, não medição bruta) |
| Riqueza narrativa | Alta — liga tech (seu interesse) com meio ambiente, ângulo pouco explorado |
| Viável em 3 semanas | Alta |

---

## Tema G — Migração forçada / refugiados (aprofundado)

### O que existe de dado real
- **[UNHCR Refugee Statistics API](https://api.unhcr.org/docs/refugee-statistics.html)**
  — API pública, sem necessidade de conta paga; suporta `download=true` pra
  já devolver CSV direto. Filtra por país de origem/asilo (código ISO3),
  ano, tipo de população (refugiado, deslocado interno, apátrida etc).
  Dado desagregado por ano + país de asilo + país de origem — dá pra montar
  fluxo de origem→destino (bom pra Sankey, item que já está no nosso
  `selecao-de-graficos.md`).
- **Mirrors no Kaggle** (caso a API dê trabalho): [UNHCR Refugee Data](https://www.kaggle.com/datasets/unitednations/refugee-data),
  [UNHCR Refugee Dataset](https://www.kaggle.com/datasets/alfabraham/unhcr-refugee-dataset),
  [Refugees 2010-2022](https://www.kaggle.com/datasets/sujaykapadnis/refugees).
- **[Forced displacement flow dataset](https://www.unhcr.org/refugee-statistics/insights/explainers/forcibly-displaced-flow-data.html)**
  — série histórica **desde 1962**, ótima pra linha do tempo longa.
- **[Global Trends Report](https://www.unhcr.org/global-trends)** (jun/2026)
  — números-chave já analisados, bom pra citar conclusões.
- **⭐ Achado novo — conexão direta com o Brasil:** [ACNUR Brasil — Dados](https://www.acnur.org/br/dados-refugiados-no-brasil-e-no-mundo)
  + CONARE (Comitê Nacional para Refugiados). Em 2025 o Brasil reconheceu
  165.774 pessoas como refugiadas (+5,9% vs. 2024); desde 1985 já são ~60 mil
  reconhecidas, sendo 48.789 (81%) da Venezuela; em 2024 as solicitações
  bateram recorde (68.159, +16,3%), com a Venezuela concentrando 93,1% dos
  reconhecimentos, seguida por Afeganistão, Colômbia e Síria. Isso permite
  fechar a história "do mundo pro seu país": tendência global de UNHCR →
  recorte específico do Brasil como destino real de refugiados.

### Ângulos de pergunta central

**Globais (o tema é isso — funcionam 100% sem citar o Brasil):**
- "De onde e pra onde o mundo é forçado a se mover — e por quê?"
- "Existem mais pessoas deslocadas por guerra hoje do que em qualquer
  outro momento desde 1962?" (foco na série histórica longa)
- "Quais guerras hoje geram mais deslocamento — e o mundo está prestando
  atenção nelas?" (cruza UCDP/OWID do Tema B com volume de deslocados por
  conflito)

**Recorte opcional Brasil (só se você quiser fechar a história aterrissando
em casa — não é obrigatório, dá pra ignorar completamente):**
- "De onde e pra onde o mundo é forçado a se mover — e o Brasil virou
  destino?" (painel global + uma seção final com CONARE/ACNUR)
- "9 em cada 10 refugiados reconhecidos no Brasil vêm de um só país — por
  quê?" (esse aqui já não é mais global, é 100% sobre o Brasil)

### Sugestão de 4 visualizações — versão 100% global
1. **Destaque:** linha do tempo de pessoas deslocadas à força no mundo,
   1962→hoje (Forced displacement flow dataset)
2. Fluxo origem→destino dos principais corredores de deslocamento no mundo
   (Sankey, dado UNHCR — ex. Síria→Turquia, Venezuela→Colômbia, etc.)
3. Ranking dos países que mais recebem refugiados (não são só os "ricos" —
   maioria fica em países vizinhos, ótimo ponto pra desconstruir uma
   suposição comum)
4. Comparação do número de deslocados por conflito ativo (cruza com dado
   do Tema B/UCDP) — quais guerras deslocam mais gente

### Sugestão de 4 visualizações — se incluir o recorte Brasil
Trocar a #3 ou #4 acima por: ranking dos países de origem dos refugiados
reconhecidos no Brasil (Venezuela 93,1%, depois Afeganistão/Colômbia/Síria)
e/ou comparação de solicitações vs. reconhecimentos no Brasil ao longo dos
anos (CONARE/ACNUR) — como uma seção final "e no Brasil?", não como o tema
inteiro.

### Avaliação
| Critério | Nota |
| --- | --- |
| Dado real baixável | Muito alta (API oficial com CSV direto + mirrors Kaggle; dado do Brasil é bônus opcional) |
| Riqueza narrativa | Muito alta — gancho humano forte, tema é global por natureza (Brasil é só um fechamento opcional) |
| Viável em 3 semanas | Alta |
| Observação | **Combina muito bem com o Tema B** (guerra → deslocamento é uma continuação natural da mesma história: conflito → economia → gente que precisa fugir), e agora tem um final "chegando no Brasil" que nenhum dos outros temas tem |

---

## Resumo e recomendação

_Temas descartados pelo autor: LLMs no mundo, agentes de IA no mercado e
comércio/guerra tarifária — removidos desta análise._

| Tema | Dado real | Narrativa | Viabilidade | Recomendação |
| --- | --- | --- | --- | --- |
| A — GitHub/agentes de código | Alta | Alta | Alta | Forte alternativa, não escolhida |
| B — Guerra/economia/cotidiano | Muito alta | Alta | Alta | Forte alternativa, não escolhida |
| **E — Pegada ambiental da IA** | Alta (estimativas IEA) | Alta | Alta | **✅ Escolhido — ver topo do documento** |
| G — Migração forçada/refugiados | Muito alta | Muito alta | Alta | Forte alternativa, não escolhida |

**Decisão final (29/07/2026): Tema E.** Próximo passo é a Fase 2 do
`WORK_RULES.md` — baixar/consultar as fontes (IEA .Stat, Epoch AI, OWID
Energy, Kaggle) e registrar cada uma em
`docs/references/fontes-dados.md`.
