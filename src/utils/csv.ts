/** Converte campo de CSV pra number; string vazia ou não-numérica vira null. */
export function parseNullableNumber(value: string | undefined): number | null {
  if (value === undefined || value.trim() === '') return null
  const n = Number(value)
  return Number.isNaN(n) ? null : n
}
