/**
 * Paletas do dashboard. Preenchido quando o tema/pergunta central for definido.
 * Ver docs/best-practices/cor-e-acessibilidade.md antes de escolher cores:
 * - Contraste mínimo AA (4.5:1 texto, 3:1 elementos gráficos)
 * - Testar com simuladores de daltonismo (protanopia, deuteranopia, tritanopia)
 * - Reservar a cor de destaque para o dado-chave da narrativa; resto em neutros
 */

export const neutral = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#e5e5e5',
  300: '#d4d4d4',
  400: '#a3a3a3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
  950: '#0a0a0a',
} as const

// TODO: definir accent (cor de destaque narrativo) e escala categórica
// acessível assim que o tema for escolhido.
export const accent = {
  // 500: '#...'
} as const
