# Temas candidatos — análise comparativa

Documento de apoio pra Fase 1 (`WORK_RULES.md`): comparar os temas em mente
antes de fechar um. Critério principal não é "qual é mais interessante" —
é **qual tem dado real, aberto e baixável o suficiente pra virar 4+
visualizações em ~3 semanas** (hoje: 28/07/2026, entrega: 20/08/2026).

Pesquisei fontes reais pra cada um. Resumo no final.

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

## Tema C — LLMs: o que mudou no mundo

### O que existe de dado real
- **[Stanford AI Index Report](https://aiindex.stanford.edu/)** — ⭐ a
  melhor fonte acadêmica aberta sobre IA: adoção, investimento, benchmarks
  de capacidade, opinião pública, por país. Dados baixáveis, muito citado
  em papers.
- **OWID — [Artificial Intelligence](https://ourworldindata.org/artificial-intelligence)**
  — CSVs baixáveis: investimento em IA, papers publicados, compute usado
  pra treinar modelos, opinião pública sobre IA.
- Números de mercado (ChatGPT ~900M usuários semanais, adoção enterprise
  saltando de 5% pra 80%) vêm de relatórios de mercado — citáveis, não
  baixáveis como dataset bruto.

### Pergunta central candidata
- "As LLMs foram adotadas mais rápido que a internet ou o smartphone?"
  (comparação de curva de adoção — boa pergunta específica e respondível)
- Versão genérica "o que mudou no mundo" é **fraca demais** pra pergunta
  central — precisaria de recorte.

### Avaliação
| Critério | Nota |
| --- | --- |
| Dado real baixável | Alta (Stanford AI Index, OWID) |
| Riqueza narrativa | Média — tema mais abstrato, exige recorte forte |
| Viável em 3 semanas | Média-alta |
| Ressoa com você | Não detalhado ainda |

---

## Tema D — Agentes de IA (mercado, adoção corporativa)

### O que existe de dado real
- Majoritariamente relatórios de mercado pagos (Grand View Research, Menlo
  Ventures) — números citáveis (mercado de $10,9-12B em 2026, 80% das
  empresas com IA agêntica em produção) mas **sem dataset bruto público**
  por trás.
- Sobrepõe muito com o Tema A (agentes de codificação) e com o Tema C
  (Stanford AI Index também cobre agentes).

### Avaliação
| Critério | Nota |
| --- | --- |
| Dado real baixável | Baixa |
| Riqueza narrativa | Média |
| Viável em 3 semanas | Baixa-média |
| Recomendação | Fundir com Tema A ou C em vez de ser tema próprio |

---

## Resumo e recomendação

| Tema | Dado real | Narrativa | Viabilidade | Recomendação |
| --- | --- | --- | --- | --- |
| A — GitHub/agentes de código | Alta | Alta | Alta | 🥇 Favorito |
| B — Guerra/economia/cotidiano | Muito alta | Alta | Alta | 🥈 Forte alternativa |
| C — LLMs no mundo | Alta | Média (exige recorte) | Média-alta | Viável se recortar bem |
| D — Agentes de IA (mercado) | Baixa | Média | Baixa-média | Não recomendo como tema isolado |

**Próximo passo:** escolher entre A e B (os dois mais fortes), ou decidir
se dá pra combinar (ex.: "como a IA mudou quem programa e o que isso
significa pro mercado de trabalho" cruzando Stack Overflow Survey com
Octoverse). Registrar a decisão final aqui e em
`docs/references/fontes-dados.md` assim que fechar.
