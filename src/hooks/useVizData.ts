import { useAdaptationsTimeline } from './useAdaptationsTimeline'
import { useBatmanBoxOffice } from './useBatmanBoxOffice'
import { useBatmanVillains } from './useBatmanVillains'
import { useComicsTimeline } from './useComicsTimeline'
import { useDeathPoll } from './useDeathPoll'

/** Carrega os dados das seis visualizações de uma vez. Como as duas abas
 * (apresentação e dashboard) mostram os mesmos gráficos, centralizar aqui
 * evita duplicar os hooks e recarregar tudo ao trocar de aba. */
export function useVizData() {
  return {
    adaptations: useAdaptationsTimeline(),
    deathPoll: useDeathPoll(),
    comicsTimeline: useComicsTimeline(),
    boxOffice: useBatmanBoxOffice(),
    villains: useBatmanVillains(),
  }
}

export type VizData = ReturnType<typeof useVizData>
