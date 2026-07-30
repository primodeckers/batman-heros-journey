# Fontes de dados

Registro de todo dataset usado no dashboard. Preencher conforme os dados
forem escolhidos — cada linha aqui deve corresponder a uma citação visível
no próprio painel (requisito obrigatório, ver `WORK_RULES.md`).

**Tema: pegada ambiental da IA.** Pesquisa completa das fontes em
`docs/temas-candidatos.md`, seção Tema E.

| Fonte | Link | Dataset usado | Data de acesso | Arquivo local |
| --- | --- | --- | --- | --- |
| Epoch AI — AI Data Centers | [epoch.ai/data/ai-data-centers](https://epoch.ai/data/ai-data-centers) | 322 data centers de IA no mundo: país, potência (MW), H100-equivalentes, empresa | 29/07/2026 | `public/data/epoch-ai-data-centers.csv` |
| Epoch AI — Data Center Timelines | [epoch.ai/data/ai-data-centers](https://epoch.ai/data/ai-data-centers) | Linha do tempo de construção por data center: data, potência, **uso de água (MGD)** | 29/07/2026 | `public/data/epoch-ai-data-center-timelines.csv` |
| Our World in Data — Energy | [github.com/owid/energy-data](https://github.com/owid/energy-data) | Demanda elétrica (TWh) por país, 2015-2024 — filtrado do dataset completo `owid-energy-data.csv` (só colunas country/year/iso_code/electricity_demand) | 29/07/2026 | `public/data/owid-electricity-demand-by-country.csv` |
| IEA — Key Questions on Energy and AI (abr/2026) | [iea.org/reports/key-questions-on-energy-and-ai](https://www.iea.org/reports/key-questions-on-energy-and-ai) + Carbon Brief | Números citados no relatório, **transcritos manualmente** (IEA bloqueia scraping direto e o Data Explorer exige conta) — consumo de data centers, participação da IA, emissões, pegada de água, faixas de incerteza | 29/07/2026 | `public/data/iea-ai-energy-estimates.csv` |
| ~~Kaggle — LLM Energy Consumption Dataset~~ | [kaggle.com/datasets/nitishkumar2k01/llms-energy-consumption-dataset](https://www.kaggle.com/datasets/nitishkumar2k01/llms-energy-consumption-dataset) | Descartado por ora — a coluna "Water use (MGD)" do Epoch AI Timelines já cobre o ângulo de pegada de água com dado mais granular | — | — |

**Nota sobre `iea-ai-energy-estimates.csv`:** diferente dos outros, não é um
dataset bruto baixado — é uma tabela pequena com os números que o próprio
relatório da IEA (e a reportagem da Carbon Brief) já publicaram como
citação. Isso precisa ficar explícito no dashboard (rótulo "estimativa",
não "medição"), é inclusive parte da narrativa do Tema E.

## Fontes abertas sugeridas (WORK_RULES.md)
- [IBGE](https://www.ibge.gov.br/)
- [IPEA Data](http://www.ipeadata.gov.br/)
- [Portal da Transparência](https://portaldatransparencia.gov.br/)
- [Our World in Data](https://ourworldindata.org/)
- [Kaggle](https://www.kaggle.com/datasets)
- [DataSUS](https://datasus.saude.gov.br/)
