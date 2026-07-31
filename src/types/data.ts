// Tipos de dados do dashboard — Tema A: GitHub / agentes de código.

export type DataSource = {
  name: string
  url: string
  accessedAt: string
}

/** Uma categoria de resposta com contagem (public/data/stackoverflow-ai-*.csv) */
export type CategoryCount = {
  category: string
  count: number
}

/** Adoção de IA por faixa de experiência (public/data/stackoverflow-ai-adoption-by-experience.csv) */
export type AIAdoptionByExperience = {
  experience: string
  count: number
  total: number
  pct: number
}

/** Uso de linguagem por trimestre no GitHub (public/data/github-language-trend.csv) */
export type LanguageTrendPoint = {
  year: number
  quarter: number
  language: string
  numPushers: number
}

/** Atenuação do ganho de produtividade por camada de produção (Demirer, Musolff
 * & Yang 2026, Table 5) — public/data/nber-productivity-attenuation.csv */
export type ProductivityAttenuationPoint = {
  toolCategory: string
  layer: string
  layerOrder: number
  effectPct: number
}

/** Comparação de ferramentas de IA específicas (mesmo paper, Table 5) —
 * public/data/nber-tool-comparison.csv */
export type ToolComparisonRow = {
  tool: string
  category: string
  linesPct: number
  commitsPct: number
  prsPct: number
  releasesPct: number | null
}
