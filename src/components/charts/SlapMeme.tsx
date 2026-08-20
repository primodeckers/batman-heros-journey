import { motion } from 'framer-motion'

import { neutral } from '@/theme/palette'
import { asset } from '@/utils/asset'

/**
 * Recorte com fundo transparente. Duas etapas pra chegar num contorno
 * orgânico, sem nenhuma borda reta: (1) remove o coral do fundo por
 * distância de cor, com uma faixa de transição larga o bastante pra
 * disfarçar os blocos de compressão JPEG do original (280px, bem
 * comprimido); (2) aplica uma vinheta elíptica com leve ondulação, que
 * esmaece as pontas do desenho — nuvens de fala, capa do Robin — antes que
 * cheguem ao limite quadrado do arquivo. Ver
 * `scripts/generate-slap-meme.py` pro script que gerou este PNG a partir do
 * JPEG original.
 */
const CUTOUT = asset('memes/batman-slap.png')
const LINES = asset('memes/impact-lines.jpg')

/** Os dois balões vêm desenhados no recorte, então cada fala é posicionada
 * por porcentagem sobre o balão. Trocar a imagem exige reconferir. */
const SETUP_BALLOON = { left: '8%', width: '34%', top: '5%', height: '22%' }
const PUNCHLINE_BALLOON = { right: '5%', width: '37%', top: '3%', height: '22%' }

/** Máscara radial: as linhas somem antes de chegar na borda, senão volta o
 * retângulo que a gente acabou de tirar. */
const LINES_MASK = 'radial-gradient(circle at 50% 48%, #000 30%, transparent 70%)'

/**
 * Meme clássico do tapa fechando o último capítulo. O recorte fica no meio
 * das duas eras: o Batman (lado da era nova) corrigindo o Robin (lado da era
 * que levou o tapa). As falas entram em tempos diferentes pra piada seguir o
 * ritmo da narração.
 */
export function SlapMeme({ setup, punchline }: { setup: string; punchline: string }) {
  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 220, damping: 22 }}
      className="relative w-[300px] shrink-0"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-[-14%] bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${LINES})`,
          maskImage: LINES_MASK,
          WebkitMaskImage: LINES_MASK,
          opacity: 0.22,
        }}
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.22 }}
        transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
      />

      <img
        src={CUTOUT}
        alt={`Meme do Batman dando um tapa no Robin. Robin diz "${setup}" e o Batman responde "${punchline}".`}
        className="relative block w-full"
        draggable={false}
      />

      <motion.p
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, type: 'spring', stiffness: 320, damping: 18 }}
        className="absolute flex items-center justify-center text-center text-[11px] leading-[1.15] font-black uppercase"
        style={{ ...SETUP_BALLOON, color: neutral[900] }}
      >
        {setup}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 340, damping: 15 }}
        className="absolute flex items-center justify-center text-center text-[12px] leading-[1.12] font-black uppercase"
        style={{ ...PUNCHLINE_BALLOON, color: neutral[900] }}
      >
        {punchline}
      </motion.p>
    </motion.figure>
  )
}
