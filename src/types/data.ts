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
