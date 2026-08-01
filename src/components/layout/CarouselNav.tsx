import { ChevronLeft, ChevronRight } from 'lucide-react'

type CarouselNavProps = {
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
}

/**
 * Setas de navegação grandes, só ícone, flutuando sobre o próprio
 * gráfico e centralizadas verticalmente — estilo carrossel de
 * Netflix/Prime Video, em vez de botões de texto abaixo do indicador de
 * capítulo.
 */
export function CarouselNav({ onPrev, onNext, hasPrev, hasNext }: CarouselNavProps) {
  const buttonClass =
    'group absolute top-1/2 z-20 flex size-14 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-black/55 focus-visible:opacity-100 group-hover/chart:opacity-100 disabled:pointer-events-none disabled:opacity-0'

  return (
    <>
      <button
        type="button"
        onClick={onPrev}
        disabled={!hasPrev}
        aria-label="Capítulo anterior"
        className={`${buttonClass} left-3`}
      >
        <ChevronLeft className="size-8" strokeWidth={1.75} />
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!hasNext}
        aria-label="Próximo capítulo"
        className={`${buttonClass} right-3`}
      >
        <ChevronRight className="size-8" strokeWidth={1.75} />
      </button>
    </>
  )
}
