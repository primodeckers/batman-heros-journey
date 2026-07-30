/**
 * Paletas do dashboard. Ver docs/best-practices/cor-e-acessibilidade.md
 * antes de escolher cores:
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

/**
 * Accent do Tema A (GitHub / agentes de código): índigo — associado a
 * tecnologia/IA sem colidir com o vermelho-verde, então continua
 * distinguível dos neutros em qualquer tipo de daltonismo (diferença de
 * luminância + hue, não só hue). Escala baseada em Tailwind Indigo.
 */
export const accent = {
  50: '#eef2ff',
  100: '#e0e7ff',
  200: '#c7d2fe',
  300: '#a5b4fc',
  400: '#818cf8',
  500: '#6366f1',
  600: '#4f46e5',
  700: '#4338ca',
  800: '#3730a3',
  900: '#312e81',
} as const
