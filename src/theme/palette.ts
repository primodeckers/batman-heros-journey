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

/**
 * Accent do Tema E (pegada ambiental da IA): âmbar, associado a
 * alerta/consumo/custo — nunca depende de vermelho-verde, então continua
 * distinguível dos neutros em qualquer tipo de daltonismo (a diferença é
 * de luminância + hue, não só hue). Escala baseada em Tailwind Amber.
 */
export const accent = {
  50: '#fffbeb',
  100: '#fef3c7',
  200: '#fde68a',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b',
  600: '#d97706',
  700: '#b45309',
  800: '#92400e',
  900: '#78350f',
} as const

/**
 * Exceção documentada ao accent único: água usa azul, porque é uma
 * convenção forte demais (azul=água) pra brigar com ela — usada só no
 * card "Quanto a IA bebe" (WaterGlassGauge), em nenhum outro gráfico.
 * Escala baseada em Tailwind Blue.
 */
export const water = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
} as const
