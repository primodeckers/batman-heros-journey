import { Clapperboard, History, Skull, Sparkles, Swords, TrendingUp } from 'lucide-react'

import type { ChartSwitcherItem } from './ChartSwitcher'

export type VizId =
  | 'adaptations'
  | 'deathPoll'
  | 'comicsTimeline'
  | 'boxOffice'
  | 'villains'
  | 'eraComparison'

export type VizItem = ChartSwitcherItem<VizId> & {
  /** Título narrativo completo — modo apresentação, um gráfico por vez. */
  title: string
  /** Mesma conclusão em menos palavras — cabe no card do grid sem virar
   * três linhas. Continua afirmando algo, não só rotulando o eixo. */
  gridTitle: string
  /** Estágio do monomito, usado no indicador de capítulo. */
  chapter: string
  /** Segundos reservados pra esse capítulo na fala, conforme
   * docs/roteiro-apresentacao.md. Somados dão 8 min, deixando a abertura e o
   * fechamento pra fechar os 9,5 min de meta. Alimenta a contagem
   * regressiva no indicador de capítulo. */
  durationSec: number
}

/** A ordem deste array É a ordem da jornada do herói
 * (mundo comum → provação → recompensa). */
export const VIZ_ITEMS: VizItem[] = [
  {
    id: 'adaptations',
    durationSec: 90,
    label: '86 anos de Batman',
    title: '86 anos depois da estreia em quadrinhos, o Batman ainda está na tela grande',
    gridTitle: '86 anos depois, o Batman ainda está na tela grande',
    chapter: 'Mundo comum',
    icon: Sparkles,
  },
  {
    id: 'deathPoll',
    durationSec: 90,
    label: 'Por 72 votos, mataram o Robin',
    title: 'Em 1988, os fãs decidiram por telefone matar o Robin — por uma margem de só 72 votos',
    gridTitle: 'Por 72 votos, os fãs mataram o Robin em 1988',
    chapter: 'Provação suprema',
    icon: Skull,
  },
  {
    id: 'comicsTimeline',
    durationSec: 60,
    label: 'O padrão se repete nos quadrinhos',
    title: 'Batman "morreu" e voltou 3 vezes em 22 anos de quadrinhos — não foi só uma vez',
    gridTitle: 'Batman "morreu" e voltou 3 vezes em 22 anos',
    chapter: 'Padrão se repete',
    icon: History,
  },
  {
    id: 'boxOffice',
    durationSec: 120,
    label: 'Batman quase morreu no cinema',
    title:
      'Batman & Robin (12% no Rotten Tomatoes) quase matou a franquia — Batman Begins a ressuscitou',
    gridTitle: 'Batman & Robin quase matou a franquia; Begins a ressuscitou',
    chapter: 'Morte no cinema',
    icon: Clapperboard,
  },
  {
    id: 'villains',
    durationSec: 60,
    label: 'Os vilões que sempre voltam',
    title: 'Coringa, Duas-Caras e Charada são os únicos vilões que já voltaram mais de uma vez',
    gridTitle: 'Só Coringa, Duas-Caras e Charada voltaram mais de uma vez',
    chapter: 'Vilões',
    icon: Swords,
  },
  {
    id: 'eraComparison',
    durationSec: 60,
    label: 'A recompensa da ressurreição',
    title:
      'Depois de quase morrer, o Batman virou 2,6x mais bilheteria e saiu de "podre" pra "certificado fresco"',
    gridTitle: 'Depois de quase morrer, virou 2,6x mais bilheteria',
    chapter: 'Recompensa',
    icon: TrendingUp,
  },
]

export const SOURCES = [
  { name: 'Box Office Mojo', url: 'https://www.boxofficemojo.com/' },
  { name: 'Rotten Tomatoes', url: 'https://www.rottentomatoes.com/' },
  { name: 'Wikipedia — filmes do Batman', url: 'https://en.wikipedia.org/wiki/Batman_in_film' },
  {
    name: 'A Death in the Family (1988)',
    url: 'https://en.wikipedia.org/wiki/A_Death_in_the_Family_(comics)',
  },
  { name: 'DC Database (Fandom)', url: 'https://dc.fandom.com/wiki/Batman:_Knightfall' },
  { name: 'Wikipedia — Batman (personagem)', url: 'https://en.wikipedia.org/wiki/Batman' },
]

/** Vai separado das fontes no rodapé porque não é origem de dado: é o artigo
 * que embasa a estrutura narrativa do modo apresentação. */
export const METHOD_REFERENCE = {
  name: 'Wei, Qu & Xu — Jornada do herói em data videos (IEEE VIS 2024)',
  url: 'https://xxuxian.github.io/assets/pdf/Vis_24.pdf',
}
