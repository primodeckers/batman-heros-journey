import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

import { accent, neutral } from '@/theme/palette'

const FADE_IN_MS = 1400
const FADE_OUT_MS = 700
const FADE_STEP_MS = 40
/** Baixo o bastante pra narração passar por cima sem disputar. */
const TARGET_VOLUME = 0.4

function fadeTo(audio: HTMLAudioElement, to: number, durationMs: number, onDone?: () => void) {
  const from = audio.volume
  const steps = Math.max(1, Math.round(durationMs / FADE_STEP_MS))
  let step = 0

  const id = setInterval(() => {
    step += 1
    audio.volume = Math.min(1, Math.max(0, from + ((to - from) * step) / steps))
    if (step >= steps) {
      clearInterval(id)
      onDone?.()
    }
  }, FADE_STEP_MS)

  return () => clearInterval(id)
}

/**
 * Trilha que entra sozinha quando o capítulo aparece e sai quando ele sai —
 * o áudio é criado fora do DOM justamente pra sobreviver ao desmonte e ainda
 * conseguir fazer o fade de saída antes de parar.
 *
 * O navegador só libera som depois de alguma interação na página. Na
 * apresentação isso já aconteceu (o clique que trouxe pra cá), mas se o
 * capítulo for aberto direto pela URL o `play()` é bloqueado — nesse caso o
 * botão fica em destaque esperando um clique.
 */
export function ChapterSoundtrack({
  src,
  startAt = 0,
  label,
}: {
  src: string
  /** Segundo em que a faixa começa — serve pra cair direto no refrão. */
  startAt?: number
  label: string
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0
    audioRef.current = audio

    let cancelFade: (() => void) | undefined

    const start = () => {
      audio.currentTime = startAt
      audio
        .play()
        .then(() => {
          setPlaying(true)
          setBlocked(false)
          cancelFade = fadeTo(audio, TARGET_VOLUME, FADE_IN_MS)
        })
        .catch(() => setBlocked(true))
    }

    if (audio.readyState >= 1) start()
    else audio.addEventListener('loadedmetadata', start, { once: true })

    return () => {
      cancelFade?.()
      audio.removeEventListener('loadedmetadata', start)
      fadeTo(audio, 0, FADE_OUT_MS, () => {
        audio.pause()
        audio.src = ''
      })
    }
  }, [src, startAt])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      setPlaying(false)
      fadeTo(audio, 0, FADE_OUT_MS, () => audio.pause())
      return
    }

    audio.currentTime = startAt
    audio.volume = 0
    audio.play().then(
      () => {
        setPlaying(true)
        setBlocked(false)
        fadeTo(audio, TARGET_VOLUME, FADE_IN_MS)
      },
      () => setBlocked(true),
    )
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? `Parar ${label}` : `Tocar ${label}`}
      aria-pressed={playing}
      title={blocked ? `Clique pra tocar ${label}` : label}
      className="flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        ['--tw-ring-color' as string]: accent[500],
        borderColor: playing ? accent[500] : neutral[300],
        backgroundColor: playing ? accent[50] : 'transparent',
        color: playing ? accent[700] : neutral[500],
      }}
    >
      <motion.span
        className="flex items-center"
        animate={{ scale: playing ? [1, 1.15, 1] : 1 }}
        transition={{ duration: 1.8, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
      >
        {playing ? <Volume2 className="size-3.5" /> : <VolumeX className="size-3.5" />}
      </motion.span>
      {label}
    </button>
  )
}
