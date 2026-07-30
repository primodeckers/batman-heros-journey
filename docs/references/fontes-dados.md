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
