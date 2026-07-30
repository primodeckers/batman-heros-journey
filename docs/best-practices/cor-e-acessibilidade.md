# Cor e acessibilidade

Cor é o recurso narrativo mais poderoso e o mais fácil de usar mal. Regras
para este projeto:

## 1. Cor com função, não decoração

- Defina **uma** cor de destaque (accent) para o dado-chave da narrativa —
o ponto que a pergunta central está tentando provar.
- Todo o resto do gráfico (categorias secundárias, eixos, grades) fica em
**neutros** (cinzas). Isso é o que o critério do professor chama de "uso
intencional de cor".
- Nunca use cor só para "colorir" — se remover a cor e o gráfico ainda
comunica a mesma coisa, a cor não tinha função.
- **Exceção documentada deste projeto:** o dashboard usa âmbar (`accent`
em `src/theme/palette.ts`) como destaque em todos os gráficos, exceto o
de pegada de água (`WaterGlassGauge`), que usa azul (`water`). Água é uma
convenção de cor forte demais pra brigar com ela — nesse caso o intuitivo
ganha da consistência estrita. Qualquer exceção assim precisa ser
deliberada e registrada aqui, não uma escolha aleatória por gráfico.

## 2. Contraste mínimo (WCAG)

- Texto normal: contraste ≥ **4.5:1** contra o fundo.
- Texto grande (≥24px ou 19px bold) e elementos gráficos (barras, linhas,
ícones): contraste ≥ **3:1**.
- Ferramenta: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).
- Em `culori`/`d3-color` dá pra checar contraste programaticamente antes de
fixar a paleta em `src/theme/palette.ts`.



## 3. Daltonismo (Color Vision Deficiency)

~8% dos homens e ~0.5% das mulheres têm alguma forma de daltonismo
(majoritariamente deuteranopia/protanopia — dificuldade com vermelho-verde).

- **Nunca** codifique informação só com a dupla vermelho/verde (ex.:
"vermelho = queda, verde = alta"). Combine com forma, posição, texto ou
espessura/padrão de linha.
- Prefira paletas categóricas testadas para CVD, como as de
[ColorBrewer](https://colorbrewer2.org/) (marcar "colorblind safe") ou
[Okabe-Ito](https://jfly.uni-koeln.de/color/) (paleta de 8 cores, padrão
em publicações científicas).
- Simule antes de fechar a paleta — ferramentas de verificação de
daltonismo:
  - [Coblis — Color Blindness Simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/)
  (upload de imagem, roda no navegador)
  - [Color Oracle](https://colororacle.org/) (Windows/Mac/Linux, grátis e
  open source — aplica um filtro em tempo real na tela inteira, útil pra
  conferir o dashboard rodando de verdade, não só um print)
  - [Vischeck](https://www.vischeck.com/) (simula + tem correção
  "Daltonize", que realoca a informação de cor pra canais perceptíveis)
  - [Check My Colours](https://www.checkmycolours.com/) (aponta URL do
  dashboard e ele varre todos os elementos verificando contraste
  considerando deficiência de cor — bom pra rodar direto no
  `localhost:5173` durante o dev)
  - ou a extensão de DevTools do Chrome (Rendering → Emulate vision
  deficiencies).
- Para escalas sequenciais/divergentes (ex.: mapas de calor), use paletas
perceptualmente uniformes: `viridis`, `magma`, `cividis` (via
`d3-scale-chromatic`) — evitam picos de luminância que distorcem a
leitura.



## 4. Saturação e hierarquia visual

- Reduza saturação de elementos secundários; reserve saturação alta só para
o destaque. Saturação uniforme em tudo = nenhuma hierarquia.
- Em modo escuro, cores muito saturadas "vibram" contra fundo escuro — reduza
~10-15% de saturação/luminância nas variantes dark (ver
`src/theme/palette.ts`).



## 5. Checklist rápido antes de fechar a paleta

- [ ] Existe 1 cor de destaque clara e o resto é neutro?
- [ ] Contraste texto ≥ 4.5:1, elementos gráficos ≥ 3:1?
- [ ] Simulei em pelo menos 2 tipos de daltonismo?
- [ ] Nenhuma informação depende só de vermelho vs. verde?
- [ ] Escalas sequenciais usam paleta perceptualmente uniforme?