import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'

type ComicPageFlipProps = {
  pageKey: string
  /** 1 = próximo, -1 = anterior */
  direction: number
  children: ReactNode
  className?: string
}

/** Duração bem visível do folhear (segundos). */
const DURATION = 1.15

/**
 * Folhear estilo gibi com framer-motion.
 * Mais estável que StPageFlip neste dashboard (gráficos + React):
 * a lib realista cortava a animação no meio da virada.
 */
export function ComicPageFlip({ pageKey, direction, children, className }: ComicPageFlipProps) {
  const origin = direction >= 0 ? 'left center' : 'right center'

  return (
    <div className={className} style={{ perspective: 1600, position: 'relative' }}>
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={pageKey}
          custom={direction}
          variants={{
            enter: (dir: number) => ({
              rotateY: dir >= 0 ? 78 : -78,
              x: dir >= 0 ? 28 : -28,
              opacity: 0.35,
              boxShadow: '0 0 0 rgb(0 0 0 / 0)',
            }),
            center: {
              rotateY: 0,
              x: 0,
              opacity: 1,
              boxShadow: '0 0 0 rgb(0 0 0 / 0)',
            },
            exit: (dir: number) => ({
              rotateY: dir >= 0 ? -78 : 78,
              x: dir >= 0 ? -28 : 28,
              opacity: 0.35,
              boxShadow:
                dir >= 0
                  ? '-18px 0 28px rgb(0 0 0 / 28%)'
                  : '18px 0 28px rgb(0 0 0 / 28%)',
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: DURATION,
            ease: [0.45, 0.05, 0.25, 1],
          }}
          className="absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: origin,
            backfaceVisibility: 'hidden',
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
