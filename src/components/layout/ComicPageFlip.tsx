import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type ComicPageFlipProps = {
  pageKey: string
  /** 1 = próximo, -1 = anterior */
  direction: number
  children: ReactNode
  className?: string
}

/**
 * Entrada estilo folhear de gibi — SEM `AnimatePresence`/`exit`.
 *
 * Versão anterior usava `AnimatePresence mode="wait"` com variante de
 * saída (rotateY) — em teste real (não só em dev, testado numa aba
 * nova/limpa do zero) a animação de saída as vezes nunca completava
 * (bug real de framer-motion + troca rapida de key, não é so no
 * StrictMode), deixando o AnimatePresence preso esperando o exit
 * terminar pra sempre — o grafico novo nunca montava, ficava travado no
 * grafico anterior indefinidamente. Isso e um dashboard pra
 * apresentacao de nota, entao confiabilidade > efeito visual: troca
 * instantanea de conteudo (React troca on demand, sem esperar nada) +
 * só a entrada anima (sem exit pra travar).
 */
export function ComicPageFlip({ pageKey, direction, children, className }: ComicPageFlipProps) {
  return (
    <div className={className} style={{ perspective: 1600, position: 'relative' }}>
      <motion.div
        key={pageKey}
        initial={{
          rotateY: direction >= 0 ? 46 : -46,
          opacity: 0.4,
        }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
      >
        {children}
      </motion.div>
    </div>
  )
}
