/**
 * Estimativa aproximada da largura de um texto em SVG sem precisar medir
 * no DOM (`getBBox`/canvas) — suficiente pra dimensionar margens. Fator
 * ~0.58 é uma média razoável pra fontes sans-serif tipo Inter.
 */
export function estimateTextWidth(text: string, fontSize: number) {
  return text.length * fontSize * 0.58
}

/**
 * Corta o texto com "…" se não couber na largura máxima — garante que
 * rótulo nunca seja cortado no meio/pra fora do SVG, mesmo quando a
 * margem calculada não é generosa o suficiente pro texto mais longo.
 */
export function truncateToWidth(text: string, maxWidth: number, fontSize: number) {
  if (estimateTextWidth(text, fontSize) <= maxWidth) return text
  const ellipsis = '…'
  let low = 0
  let high = text.length
  while (low < high) {
    const mid = Math.ceil((low + high) / 2)
    const candidate = text.slice(0, mid) + ellipsis
    if (estimateTextWidth(candidate, fontSize) <= maxWidth) {
      low = mid
    } else {
      high = mid - 1
    }
  }
  return low === 0 ? ellipsis : text.slice(0, low) + ellipsis
}
