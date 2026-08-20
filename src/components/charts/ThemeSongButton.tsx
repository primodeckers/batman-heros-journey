import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Pause, Play, Volume2 } from 'lucide-react'

import { accent, neutral } from '@/theme/palette'

/**
 * Transforma um marco da linha do tempo em botão liga/desliga de áudio: no
 * hover o ícone da mídia dá lugar ao play, e o clique fixa o estado ligado
 * (círculo dourado cheio + ondas sonoras) até clicarem de novo ou a faixa
 * acabar. Serve pra tocar o tema do Adam West ao vivo na apresentação.
 */
export function ThemeSongButton({
  src,
  title,
  compact = false,
  children,
}: {
  src: string
  /** Vira o aria-label e o tooltip do botão. */
  title: string
  compact?: boolean
  /** Ícone mostrado quando o botão está parado e sem hover. */
  children: ReactNode
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [unavailable, setUnavailable] = useState(false)

  /** Só `ended` desliga sozinho. O evento `pause` não serve: quando o `play()`
   * falha (mp3 ausente) o navegador dispara `pause` e o botão desligaria no
   * mesmo instante do clique. */
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const handleEnded = () => setPlaying(false)
    audio.addEventListener('ended', handleEnded)
    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
    }
  }, [])

  /** O estado visual é ligado pelo clique, não pelo `play()`: se o mp3 ainda
   * não estiver em `public/audio/`, o botão continua ligando e desligando
   * normalmente — só sai sem som. */
  const toggle = () => {
    const audio = audioRef.current
    if (playing) {
      setPlaying(false)
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
      return
    }
    setPlaying(true)
    audio?.play().then(
      () => setUnavailable(false),
      () => setUnavailable(true),
    )
  }

  const showControl = hovered || playing
  const circleSize = compact ? 'size-8' : 'size-10'
  const controlSize = compact ? 'size-3.5' : 'size-4'
  const badgeSize = compact ? 'size-3' : 'size-3.5'

  return (
    <button
      type="button"
      onClick={toggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label={playing ? `Pausar ${title}` : `Tocar ${title}`}
      aria-pressed={playing}
      title={unavailable ? 'Áudio ainda não disponível' : title}
      className="relative flex cursor-pointer items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{ ['--tw-ring-color' as string]: accent[500] }}
    >
      {playing &&
        [0, 1].map((i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute rounded-full border-2"
            style={{ borderColor: accent[500], inset: 0 }}
            initial={{ opacity: 0.55, scale: 1 }}
            animate={{ opacity: 0, scale: 2.2 }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
          />
        ))}

      {/* Ligado = morcego clássico invertido (preto no dourado cheio); desligado
          volta ao círculo claro igual aos outros marcos da linha do tempo. */}
      <motion.span
        className={`relative flex ${circleSize} items-center justify-center rounded-full border-2`}
        animate={{
          scale: playing ? 1.12 : hovered ? 1.12 : 1,
          backgroundColor: playing ? accent[500] : accent[50],
          borderColor: playing ? neutral[900] : accent[500],
          boxShadow: playing ? `0 0 0 4px ${accent[200]}` : '0 0 0 0px rgba(0, 0, 0, 0)',
        }}
        whileTap={{ scale: 0.94 }}
        transition={{
          scale: { type: 'spring', stiffness: 400, damping: 24 },
          backgroundColor: { duration: 0.25 },
          borderColor: { duration: 0.25 },
          boxShadow: { duration: 0.25 },
        }}
      >
        <motion.span
          className="absolute flex items-center justify-center"
          animate={{ opacity: showControl ? 0 : 1, scale: showControl ? 0.7 : 1 }}
          transition={{ duration: 0.18 }}
        >
          {children}
        </motion.span>

        <motion.span
          className="absolute flex items-center justify-center"
          animate={{ opacity: showControl ? 1 : 0, scale: showControl ? 1 : 0.7 }}
          transition={{ duration: 0.18 }}
        >
          {playing ? (
            <Pause className={controlSize} style={{ color: neutral[900] }} fill={neutral[900]} />
          ) : (
            <Play className={controlSize} style={{ color: accent[700] }} fill={accent[700]} />
          )}
        </motion.span>
      </motion.span>

      <motion.span
        className={`pointer-events-none absolute -right-0.5 -bottom-0.5 flex ${badgeSize} items-center justify-center rounded-full shadow-sm`}
        animate={{
          backgroundColor: playing ? neutral[900] : accent[500],
          scale: playing ? [1, 1.18, 1] : [1, 1.12, 1],
        }}
        transition={{
          backgroundColor: { duration: 0.25 },
          scale: { duration: playing ? 0.9 : 2.4, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        {playing ? (
          <Volume2 className="size-2 text-white" />
        ) : (
          <Play className="size-2 text-white" fill="white" />
        )}
      </motion.span>

      <audio ref={audioRef} src={src} preload="none" />
    </button>
  )
}
