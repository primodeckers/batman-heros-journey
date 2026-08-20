"""Gera public/memes/batman-slap.png a partir do meme original em JPEG.

O arquivo fonte (coral chapado no fundo, 280x280, bem comprimido) não vai
pro git — mora em .raw-assets/memes/batman-slap.jpg. Rodar depois de
qualquer ajuste:

    pip install pillow numpy
    python scripts/generate-slap-meme.py

Duas etapas pra sair um contorno orgânico, sem borda reta:
  1. Chroma-key por distância de cor até o coral do fundo. A faixa de
     transição é larga de propósito: um corte fino repete os blocos de
     compressão JPEG do original como um degrau visível.
  2. Uma vinheta elíptica com leve ondulação, que esmaece os elementos que
     tocam a borda do arquivo (nuvem de fala, capa do Robin) antes que
     cheguem no limite quadrado do canvas — sem isso, aquele limite aparece
     como uma linha reta sobre qualquer fundo.
"""

import math
import random

import numpy as np
from PIL import Image, ImageFilter

random.seed(11)

SRC = ".raw-assets/memes/batman-slap.jpg"
OUT = "public/memes/batman-slap.png"
UPSCALE = 3  # suaviza os blocos do JPEG original antes da key
FINAL = 560
KEY_RGB = (240, 118, 100)  # coral do fundo, ~0xF0776B
SOFT_LOW = 28
SOFT_HIGH = 62


def main() -> None:
    img = Image.open(SRC).convert("RGB")
    w0, h0 = img.size
    img = img.resize((w0 * UPSCALE, h0 * UPSCALE), Image.LANCZOS)
    w, h = img.size
    arr = np.asarray(img).astype(np.float32)

    dist = np.sqrt(((arr - np.array(KEY_RGB)) ** 2).sum(axis=2))
    key_alpha = np.clip((dist - SOFT_LOW) / (SOFT_HIGH - SOFT_LOW), 0, 1)
    key_alpha = (
        np.asarray(
            Image.fromarray((key_alpha * 255).astype(np.uint8), "L").filter(
                ImageFilter.GaussianBlur(UPSCALE * 0.75)
            )
        )
        / 255.0
    )

    cy, cx = h / 2, w / 2
    yy, xx = np.mgrid[0:h, 0:w]
    theta = np.arctan2((yy - cy) / (h * 0.5), (xx - cx) / (w * 0.5))
    r = np.sqrt(((yy - cy) / (h * 0.5)) ** 2 + ((xx - cx) / (w * 0.5)) ** 2)

    harmonics = [(2, 0.035), (3, 0.03), (5, 0.02)]
    phases = [random.uniform(0, 2 * math.pi) for _ in harmonics]
    wobble = sum(amp * np.cos(freq * theta + p) for (freq, amp), p in zip(harmonics, phases))
    contour_r = 0.86 * (1 + wobble)
    band = 0.30
    vignette = np.clip((contour_r + band - r) / (2 * band), 0, 1)
    vignette = (
        np.asarray(
            Image.fromarray((vignette * 255).astype(np.uint8), "L").filter(
                ImageFilter.GaussianBlur(UPSCALE * 1.2)
            )
        )
        / 255.0
    )

    alpha = key_alpha * vignette
    alpha_img = Image.fromarray((alpha * 255).astype(np.uint8), mode="L")

    out = img.convert("RGBA")
    out.putalpha(alpha_img)
    out = out.resize((FINAL, FINAL), Image.LANCZOS)
    out.save(OUT, optimize=True)
    print("saved", OUT, out.size)


if __name__ == "__main__":
    main()
