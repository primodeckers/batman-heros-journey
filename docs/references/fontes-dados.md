# Fontes de dados

Registro de todo dataset usado no dashboard. Preencher conforme os dados
forem escolhidos — cada linha aqui deve corresponder a uma citação visível
no próprio painel (requisito obrigatório, ver `WORK_RULES.md`).

**Tema: GitHub / agentes de código.** Pesquisa completa das fontes em
`docs/temas-candidatos.md`, seção Tema A.

| Fonte | Link | Dataset usado | Data de acesso | Arquivo local |
| --- | --- | --- | --- | --- |
| Stack Overflow Developer Survey 2025 | [github.com/StackExchange/Survey](https://github.com/StackExchange/Survey) (`packages/archive/2025/results.csv`, via Git LFS — o site oficial não disponibiliza mais o CSV bruto) | 49.191 respondentes, 170 colunas — filtrado pra adoção de IA (`AISelect`), confiança na precisão (`AIAcc`), modelos usados (`AIModelsHaveWorkedWith`) e experiência (`YearsCode`) | 31/07/2026 | `public/data/stackoverflow-ai-adoption.csv`, `stackoverflow-ai-trust.csv`, `stackoverflow-ai-vendors.csv`, `stackoverflow-ai-adoption-by-experience.csv` |
| GitHub Innovation Graph | [github.com/github/innovationgraph](https://github.com/github/innovationgraph) (`data/languages.csv`) | Nº de desenvolvedores com push por linguagem, trimestral desde 2020 até hoje — filtrado pra JavaScript/TypeScript/Python, agregado globalmente (dataset original é por país) | 31/07/2026 | `public/data/github-language-trend.csv` |
| Demirer, Musolff & Yang — *Writing Code vs. Shipping Code* | [nber.org/papers/w35275](https://www.nber.org/papers/w35275) (PDF), ver também [bibliografia.md](./bibliografia.md) | Table 5 do paper (p. 32): efeito da IA em cada camada da produção (linhas → arquivos → commits → PRs → repos → releases), agregado por categoria de ferramenta e por ferramenta específica (Claude Code, GitHub Copilot, OpenAI Codex, GitHub Agent) — números transcritos manualmente da tabela do PDF | 31/07/2026 | `public/data/nber-productivity-attenuation.csv`, `public/data/nber-tool-comparison.csv` |
| METR — *Measuring the Impact of Early-2025 AI on Experienced OSS Dev Productivity* | [github.com/METR/Measuring-Early-2025-AI-on-Exp-OSS-Devs](https://github.com/METR/Measuring-Early-2025-AI-on-Exp-OSS-Devs) (`data_complete.csv`, público) | Dataset bruto: 246 tarefas × 16 devs, tempo previsto vs. tempo real com/sem IA — números-resumo (-24% previsto, +19% real, -20% percepção pós-hoc) do [post oficial](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), verificados contra o CSV bruto | 31/07/2026 | `public/data/metr-perception-gap.csv` |
| Anthropic Economic Index | [huggingface.co/datasets/Anthropic/EconomicIndex](https://huggingface.co/datasets/Anthropic/EconomicIndex) (release `2025_09_15`, arquivo `aei_enriched_claude_ai_*.csv`, 26,8 MB — filtrado pra facet `country`, variável `usage_per_capita_index`) | Uso do Claude por país, normalizado pela população em idade ativa (194 países, 166 com uso > 0) — top 15 + posição do Brasil (69º de 166) | 31/07/2026 | `public/data/anthropic-claude-usage-by-country.csv` |

**Nota:** os 4 CSVs da Stack Overflow são **agregações pequenas geradas a
partir do CSV bruto de 134 MB** (contagens por categoria) — o arquivo
bruto não foi commitado no repositório por tamanho, só os resultados já
processados. O script de agregação está registrado no histórico da
conversa deste projeto, não em um arquivo do repo (dado que é um passo
único de preparação, não algo que roda no dashboard).

## Fontes abertas sugeridas (WORK_RULES.md)
- [IBGE](https://www.ibge.gov.br/)
- [IPEA Data](http://www.ipeadata.gov.br/)
- [Portal da Transparência](https://portaldatransparencia.gov.br/)
- [Our World in Data](https://ourworldindata.org/)
- [Kaggle](https://www.kaggle.com/datasets)
- [DataSUS](https://datasus.saude.gov.br/)
