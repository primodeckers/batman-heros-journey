# Affordances visuais

Affordance (Don Norman, *The Design of Everyday Things*) é a pista visual
que sugere como um elemento pode ser usado antes de qualquer tentativa —
uma maçaneta "pede" pra ser girada, um botão com sombra "pede" pra ser
apertado. Num dashboard interativo, todo elemento que reage a alguma ação
do usuário (clique, arraste, hover, busca) precisa comunicar isso
visualmente **antes** do usuário tentar, não só depois.

Isso é diferente de Gestalt (`gestalt-principles.md`): Gestalt organiza a
*leitura* do que já está na tela; affordance comunica o que a tela permite
*fazer*.

## 1. Cursor como sinal primário

- Qualquer elemento clicável (path de mapa, item de ranking, botão de
  controle) usa `cursor: pointer`.
- Elementos arrastáveis (pan do mapa) usam `cursor: grab` em repouso e
  `cursor: grabbing` durante o arraste — nunca o cursor padrão de texto/seta.
- Elementos sem interação (rótulos, eixo, grade) mantêm o cursor padrão —
  não sinalize interatividade que não existe.

## 2. Feedback de hover

- Todo alvo clicável muda de estado no hover (fundo, borda ou cor do
  texto) antes do clique confirmar a ação. Sem isso o usuário não sabe se
  o elemento é interativo até errar ou acertar por acaso.
- O hover não pode ser a única pista em telas touch (não existe hover em
  toque) — combine com formato de botão/borda que já sugere clicabilidade
  mesmo sem hover.

## 3. Estado atual visível

- Controles com estado (toggle de grade, métrica selecionada, país
  selecionado) precisam parecer visualmente diferentes de controles
  inativos — cor de destaque (`accent`), borda ou peso de fonte. Um botão
  "ligado" que parece idêntico a um "desligado" quebra a affordance de
  estado.
- `aria-pressed`/`aria-label` acompanham a pista visual, não substituem
  ela.

## 4. Sinalizar affordances "escondidas"

- Interações que não são óbvias por padrão (arrastar pra mover, rolar pra
  zoom, digitar num campo de busca com autocomplete) precisam de uma
  legenda textual curta e visível por perto, não escondida em tooltip ou
  documentação externa.
- Ícone + rótulo curto vale mais que só ícone quando a ação não é
  universalmente reconhecida (ex.: ícone de grade pra ligar/desligar
  coordenadas — usar `title` explicando, não só o ícone).

## 5. Affordance falsa é pior que nenhuma

- Nunca estilize um elemento como se fosse clicável (borda de botão,
  sombra, cursor pointer) se ele não faz nada — isso quebra a confiança do
  usuário no resto do dashboard.
- O inverso também vale: se um elemento é clicável mas parece estático
  (mesmo estilo de texto comum), o usuário nunca vai descobrir.

## Checklist rápido

- [ ] Todo elemento clicável tem `cursor: pointer` (ou `grab`/`grabbing`
      se arrastável)?
- [ ] Todo alvo clicável muda de aparência no hover?
- [ ] Estados ligado/selecionado são visualmente distintos de
      desligado/não selecionado?
- [ ] Interações não óbvias (drag, zoom, busca) têm legenda visível?
- [ ] Nenhum elemento parece clicável sem ser, nem é clicável sem parecer?
