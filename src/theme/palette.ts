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
 * Accent deste projeto: dourado do símbolo do morcego. Não é uma escolha
 * arbitrária de branding — é a mesma cor que a franquia usa há décadas pra
 * sinalizar "isso é o Batman", então o accent aqui reforça reconhecimento
 * em vez de competir com ele (ver docs/best-practices/atributos-pre-atentivos.md).
 * Escala baseada em Tailwind Amber/Yellow.
 */
export const accent = {
  50: '#fefce8',
  100: '#fef9c3',
  200: '#fef08a',
  300: '#fde047',
  400: '#facc15',
  500: '#eab308',
  600: '#ca8a04',
  700: '#a16207',
  800: '#854d0e',
  900: '#713f12',
} as const
