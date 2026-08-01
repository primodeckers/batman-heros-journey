import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type CarouselNavProps = {
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
  /** Controlado pelo hover da área do gráfico no DashboardShell. */
  visible?: boolean
}

/**
 * Setas de navegação — fade + scale quando a área do gráfico está em hover.
 */
export function CarouselNav({
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  visible = false,
}: CarouselNavProps) {
  return (
    <>
      <NavArrow
        side="left"
        onClick={onPrev}
        disabled={!hasPrev}
        visible={visible && hasPrev}
        label="Capítulo anterior"
      >
        <ChevronLeft className="size-8" strokeWidth={1.75} />
      </NavArrow>
      <NavArrow
        side="right"
        onClick={onNext}
        disabled={!hasNext}
        visible={visible && hasNext}
        label="Próximo capítulo"
      >
        <ChevronRight className="size-8" strokeWidth={1.75} />
      </NavArrow>
    </>
  )
}

function NavArrow({
  side,
  onClick,
  disabled,
  visible,
  label,
  children,
}: {
  side: 'left' | 'right'
  onClick: () => void
  disabled: boolean
  visible: boolean
  label: string
  children: React.ReactNode
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled || !visible}
      aria-label={label}
      initial={false}
      animate={
        visible
          ? { opacity: 1, scale: 1, x: 0 }
          : { opacity: 0, scale: 0.82, x: side === 'left' ? -12 : 12 }
      }
      whileHover={visible ? { scale: 1.1, backgroundColor: 'rgb(0 0 0 / 0.55)' } : undefined}
      whileTap={visible ? { scale: 0.94 } : undefined}
      transition={{ type: 'spring', stiffness: 380, damping: 24 }}
      className={`carousel-nav-btn absolute top-1/2 z-50 flex size-14 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm focus-visible:opacity-100 ${
        side === 'left' ? 'left-3' : 'right-3'
      }`}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      {children}
    </motion.button>
  )
}
