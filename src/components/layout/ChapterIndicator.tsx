import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import { cn } from '@/lib/utils'

export type ChapterItem = { id: string; chapter: string; durationSec?: number }

type ChapterIndicatorProps = {
  items: ChapterItem[]
  selectedIndex: number
  onSelect: (index: number) => void
}

/** Vermelho de alerta: é cromo de interface pro tempo estourado, não
 * codificação de dado — por isso pode ficar fora da paleta narrativa. */
const OVERTIME = '#dc2626'

const RING_SIZE = 42
const RING_RADIUS = 18
const RING_LENGTH = 2 * Math.PI * RING_RADIUS

function formatClock(seconds: number) {
  const over = seconds < 0
  const abs = Math.abs(seconds)
  const mins = Math.floor(abs / 60)
  const secs = abs % 60
  return `${over ? '+' : ''}${mins}:${String(secs).padStart(2, '0')}`
}

/**
 * Anel que se esvazia ao redor da bolinha do capítulo ativo, no ritmo do
 * tempo reservado pra ele no roteiro. Não tem estado: quem anima é o
 * framer-motion, e a chave reinicia a volta a cada troca de capítulo.
 */
function CountdownRing({ durationSec, runKey }: { durationSec: number; runKey: string }) {
  return (
    <svg
      width={RING_SIZE}
      height={RING_SIZE}
      className="pointer-events-none absolute"
      style={{ transform: 'rotate(-90deg)' }}
      aria-hidden="true"
    >
      <circle
        cx={RING_SIZE / 2}
        cy={RING_SIZE / 2}
        r={RING_RADIUS}
        fill="none"
        stroke={neutral[200]}
        strokeWidth={2.5}
      />
      <motion.circle
        key={runKey}
        cx={RING_SIZE / 2}
        cy={RING_SIZE / 2}
        r={RING_RADIUS}
        fill="none"
        stroke={accent[600]}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={RING_LENGTH}
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: RING_LENGTH }}
        transition={{ duration: durationSec, ease: 'linear' }}
      />
    </svg>
  )
}

/**
 * Relógio isolado num componente próprio de propósito: ele re-renderiza a
 * cada segundo, e deixar isso no indicador inteiro reiniciaria a animação
 * de pulso da bolinha ativa a cada tique.
 */
function ChapterClock({ durationSec, runKey }: { durationSec: number; runKey: string }) {
  const [remaining, setRemaining] = useState(durationSec)

  useEffect(() => {
    setRemaining(durationSec)
    const startedAt = Date.now()
    const id = setInterval(() => {
      setRemaining(durationSec - Math.floor((Date.now() - startedAt) / 1000))
    }, 250)
    return () => clearInterval(id)
  }, [durationSec, runKey])

  const over = remaining < 0

  return (
    <motion.span
      className="tabular-nums font-medium"
      style={{ color: over ? OVERTIME : accent[700] }}
      animate={over ? { opacity: [1, 0.45, 1] } : { opacity: 1 }}
      transition={over ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
    >
      {formatClock(remaining)}
    </motion.span>
  )
}

/** Silhueta de morcego em voo — asas em V com pontas serrilhadas, ao
 * estilo dos morcegos de decoração de Halloween (diferente do símbolo
 * largo e chato usado no gráfico da enquete, que lê melhor parado do que
 * voando). */
const FLYING_BAT_PATH =
  'M32 16 C30 10 22 4 12 6 C16 10 18 13 19 16 C14 15 6 13 0 8 ' +
  'C2 14 8 20 16 22 C10 22 4 24 0 28 C8 30 18 28 22 24 ' +
  'C24 27 28 30 32 30 C36 30 40 27 42 24 C46 28 56 30 64 28 ' +
  'C60 24 54 22 48 22 C56 20 62 14 64 8 C58 13 50 15 45 16 ' +
  'C46 13 48 10 52 6 C42 4 34 10 32 16 Z'

/**
 * Um morcego do bando: em vez de um deslocamento fixo em relação ao líder,
 * cada um segue seu próprio caminho de vaivém (`dx`/`dy`, listas de pontos
 * em px, distribuídas ao longo do voo) — pra imitar o jeito errático como
 * morcegos de verdade voam em grupo, cada um por conta própria, em vez de
 * uma formação rígida. Tamanho e ritmo de batida de asa também variam.
 */
type FlockBatSpec = { dx: number[]; dy: number[]; scale: number; flapDelay: number; flapDuration: number }

const FLOCK: FlockBatSpec[] = [
  { dx: [-20, -30, -12, -24, -18], dy: [-10, 6, -16, -2, -8], scale: 0.62, flapDelay: 0, flapDuration: 0.22 },
  { dx: [8, 20, 4, 16, 10], dy: [6, -8, 12, 0, 4], scale: 0.85, flapDelay: 0.05, flapDuration: 0.26 },
  { dx: [18, 8, 26, 12, 20], dy: [-10, -18, 2, -14, -8], scale: 0.55, flapDelay: 0.11, flapDuration: 0.2 },
  { dx: [-8, 4, -18, 0, -6], dy: [10, 18, 2, 14, 8], scale: 0.72, flapDelay: 0.08, flapDuration: 0.24 },
  { dx: [0, -14, 14, -4, 6], dy: [-16, 2, -6, -20, -12], scale: 0.5, flapDelay: 0.14, flapDuration: 0.18 },
]

function FlockBat({ dx, dy, scale, flapDelay, flapDuration }: FlockBatSpec) {
  return (
    <motion.div
      className="absolute"
      style={{ transformOrigin: '50% 50%' }}
      animate={{ left: dx, top: dy, scaleY: [1, 0.45, 1] }}
      transition={{
        left: { duration: FLIGHT_DURATION, ease: 'easeInOut' },
        top: { duration: FLIGHT_DURATION, ease: 'easeInOut' },
        scaleY: { duration: flapDuration, repeat: Infinity, ease: 'easeInOut', delay: flapDelay },
      }}
    >
      <svg viewBox="0 0 64 32" width={22 * scale} height={11 * scale} aria-hidden="true">
        <path d={FLYING_BAT_PATH} fill={neutral[900]} />
      </svg>
    </motion.div>
  )
}

/**
 * Duração do voo: sempre a mesma, não importa quantos capítulos o bando
 * atravessa — pular do 1 pro 6 é tão rápido quanto do 1 pro 2.
 */
const FLIGHT_DURATION = 1.15

/**
 * Indicador de capítulo — reforça que o dashboard conta UMA história com
 * começo, meio e fim (a jornada do herói), não uma lista solta de
 * gráficos que dá pra ver em qualquer ordem. O anel regressivo em volta da
 * bolinha ativa mostra quanto resta do tempo previsto pra falar aquele
 * capítulo (ver docs/roteiro-apresentacao.md).
 */
export function ChapterIndicator({ items, selectedIndex, onSelect }: ChapterIndicatorProps) {
  const total = items.length
  const current = items[selectedIndex]
  const progressPct = total > 1 ? (selectedIndex / (total - 1)) * 100 : 0

  /**
   * Dispara o arremesso a cada troca de capítulo, exceto na primeira
   * renderização. `settledIndexRef` só é atualizado quando o arremesso
   * TERMINA (ver `onAnimationComplete` abaixo) — não a cada clique. Se o
   * usuário troca de capítulo de novo antes do morcego chegar, o alvo
   * (`left`, `rotate`) é recalculado a partir do MESMO ponto de partida e o
   * framer-motion redireciona a animação em andamento pro novo destino, em
   * vez de cortar ou reiniciar do zero.
   */
  const settledIndexRef = useRef(selectedIndex)
  const flightKeyRef = useRef(0)
  const [flight, setFlight] = useState<{ key: number; fromIndex: number } | null>(null)

  useEffect(() => {
    if (total > 1 && selectedIndex !== settledIndexRef.current) {
      setFlight((current) => {
        if (current) return current
        flightKeyRef.current += 1
        return { key: flightKeyRef.current, fromIndex: settledIndexRef.current }
      })
    }
  }, [selectedIndex, total])

  /**
   * Centro real (em px, relativo à trilha) de cada bolinha — medido no DOM
   * em vez de estimado por porcentagem. A largura de cada botão (`w-[16.6%]`)
   * mais o padding da trilha faziam a conta de porcentagem divergir do
   * centro visual de cada bolinha, e por isso o batarangue nunca acertava o
   * pouso: passava ou parava antes, dependendo de qual bolinha era o alvo.
   * Medir de verdade elimina esse tipo de erro de contas.
   */
  const trackRef = useRef<HTMLDivElement>(null)
  const bulletRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [centers, setCenters] = useState<number[]>([])

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return

    const measure = () => {
      const trackRect = track.getBoundingClientRect()
      setCenters(
        bulletRefs.current.map((el) => {
          if (!el) return 0
          const r = el.getBoundingClientRect()
          return r.left + r.width / 2 - trackRect.left
        }),
      )
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    return () => observer.disconnect()
  }, [total])

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Capítulo {selectedIndex + 1} de {total}
        </span>
        <span className="flex items-center gap-2">
          <span>{current?.chapter}</span>
          {current?.durationSec ? (
            <ChapterClock durationSec={current.durationSec} runKey={current.id} />
          ) : null}
        </span>
      </div>

      <div ref={trackRef} className="relative mt-3.5 flex items-start justify-between px-2.5">
        <div
          className="absolute top-[13px] right-5 left-5 h-0.5"
          style={{ backgroundColor: neutral[200] }}
        />
        <motion.div
          className="absolute top-[13px] left-5 h-0.5 origin-left"
          initial={false}
          animate={{
            width: `calc(${progressPct}% * (100% - 2.5rem) / 100)`,
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ backgroundColor: accent[600] }}
        />

        {/* Spana a trilha inteira: as posições `left` do bando vêm de
            `centers` (medidas em px no DOM), relativas à borda esquerda
            desta mesma `trackRef`. */}
        <div className="pointer-events-none absolute inset-0 top-[13px] z-20">
          <AnimatePresence>
            {flight && centers.length === total ? (
              <motion.div
                key={flight.key}
                // `x: '-50%'` centraliza o líder do bando em cima do `left`;
                // cada morcego bate asa de forma independente dentro dele
                // (ver `FlockBat`), então aqui só cuida da posição/arco.
                className="absolute -top-[7px]"
                initial={{ left: centers[flight.fromIndex] ?? 0, x: '-50%', opacity: 0 }}
                animate={{
                  left: centers[selectedIndex] ?? 0,
                  x: '-50%',
                  opacity: [0, 1, 1, 0],
                  y: [0, -14, 0],
                }}
                transition={{
                  duration: FLIGHT_DURATION,
                  ease: [0.32, 0.72, 0, 1],
                  opacity: { duration: FLIGHT_DURATION, times: [0, 0.15, 0.85, 1] },
                  y: { duration: FLIGHT_DURATION, times: [0, 0.5, 1] },
                }}
                onAnimationComplete={() => {
                  settledIndexRef.current = selectedIndex
                  setFlight(null)
                }}
              >
                <div className="relative">
                  {FLOCK.map((bat, i) => (
                    <FlockBat key={i} {...bat} />
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {items.map((item, i) => {
          const isActive = i === selectedIndex
          const isPast = i < selectedIndex
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(i)}
              className="relative z-10 flex w-[16.6%] flex-col items-center gap-1.5"
              aria-current={isActive ? 'step' : undefined}
            >
              <span
                ref={(el) => {
                  bulletRefs.current[i] = el
                }}
                className="relative flex items-center justify-center"
              >
                {isActive && item.durationSec ? (
                  <CountdownRing durationSec={item.durationSec} runKey={item.id} />
                ) : null}
                <motion.span
                  className={cn(
                    'relative flex items-center justify-center rounded-full text-xs font-medium',
                    isActive ? 'size-[30px] -mt-0.5' : 'size-[26px]',
                  )}
                  initial={false}
                  animate={
                    isActive
                      ? { scale: [1, 1.12, 1], backgroundColor: accent[600], color: accent[50] }
                      : {
                          scale: 1,
                          backgroundColor: isPast ? accent[100] : neutral[50],
                          color: isPast ? accent[700] : neutral[500],
                        }
                  }
                  transition={
                    isActive
                      ? { duration: 0.9, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }
                      : { duration: 0.25 }
                  }
                  style={
                    isActive
                      ? { boxShadow: `0 0 0 3px ${accent[100]}` }
                      : { border: `1px solid ${isPast ? accent[300] : neutral[300]}` }
                  }
                >
                  {i + 1}
                </motion.span>
              </span>
              <motion.span
                className="text-center text-[11px] leading-tight"
                initial={false}
                animate={{
                  color: isActive ? neutral[900] : neutral[500],
                  fontWeight: isActive ? 500 : 400,
                }}
                transition={{ duration: 0.25 }}
              >
                {item.chapter}
              </motion.span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
