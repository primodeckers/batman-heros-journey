/**
 * Estimativa aproximada da largura de um texto em SVG sem precisar medir
 * no DOM (`getBBox`/canvas) — suficiente pra dimensionar margens. Fator
 * ~0.58 é uma média razoável pra fontes sans-serif tipo Inter.
 */
export function estimateTextWidth(text: string, fontSize: number) {
  return text.length * fontSize * 0.58
}
