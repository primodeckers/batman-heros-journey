/**
 * Resolve caminho de arquivo em `public/` contra a base do Vite. Em
 * desenvolvimento a base é `/`, mas no GitHub Pages o site vive em
 * `/batman-heros-journey/` — sem esse prefixo, todo CSV e imagem dá 404.
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
