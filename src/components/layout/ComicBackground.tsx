import { neutral } from '@/theme/palette'

/**
 * Fundo neutro (só textura de pontos, técnica halftone de impressão de
 * HQ) — estado provisório enquanto esperamos imagens reais do usuário
 * pra usar como fundo ilustrado. Tentativa anterior de desenhar cenas de
 * luta à mão livre em SVG não ficou boa o suficiente; melhor usar arte
 * de verdade quando ela chegar do que forçar um desenho tosco.
 */
function buildComicBackgroundSvg() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <defs>
        <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" fill="${neutral[900]}" opacity="0.1" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="${neutral[50]}" />
      <rect width="400" height="400" fill="url(#dots)" />
    </svg>`
}

const COMIC_BACKGROUND_URL = `url("data:image/svg+xml,${encodeURIComponent(buildComicBackgroundSvg())}")`

export const comicBackgroundStyle: React.CSSProperties = {
  backgroundImage: COMIC_BACKGROUND_URL,
  backgroundSize: '200px 200px',
  backgroundRepeat: 'repeat',
}
