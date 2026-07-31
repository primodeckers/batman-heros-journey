import { csvParse } from 'd3-dsv'

import type { ToolComparisonRow } from '@/types/data'
import { parseNullableNumber } from '@/utils/csv'

/** Comparação de ferramentas de IA específicas (public/data/nber-tool-comparison.csv). */
export async function loadToolComparison(): Promise<ToolComparisonRow[]> {
  const res = await fetch('/data/nber-tool-comparison.csv')
  const text = await res.text()

  return csvParse(text, (row) => ({
    tool: row['tool'] ?? '',
    category: row['category'] ?? '',
    linesPct: Number(row['lines_pct']),
    commitsPct: Number(row['commits_pct']),
    prsPct: Number(row['prs_pct']),
    releasesPct: parseNullableNumber(row['releases_pct']),
  }))
}
