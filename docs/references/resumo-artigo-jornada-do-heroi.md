# Resumo — "Telling Data Stories with the Hero's Journey"

**Zheng Wei, Huamin Qu e Xian Xu** (Hong Kong University of Science and
Technology) · IEEE Transactions on Visualization and Computer Graphics,
apresentado no IEEE VIS 2024 · PDF local:
[`xu-2024-hero-journey-data-videos.pdf`](./xu-2024-hero-journey-data-videos.pdf)

O artigo estuda **data videos**: vídeos curtos que contam uma história usando
gráficos, narração e trilha, como os que a Vox e o New York Times publicam.

## O problema

Todo mundo já sabia que a jornada do herói funciona em livro, teatro e cinema,
e já se falava em usá-la para contar histórias com dados. Mas a conversa
parava na ideia. Ninguém tinha dito **quais etapas usar, o que mostrar na
tela em cada uma e o que fazer com o som**. Outros pesquisadores já tinham
traduzido para dados a estrutura em três atos de Aristóteles e a pirâmide de
Freytag; a jornada do herói ainda estava de fora. Este artigo escreve o
manual que faltava.

## Como chegaram lá

Os autores juntaram 109 data videos bem avaliados e separaram os **48 que
contam uma jornada do herói**. Para entrar na lista, o vídeo precisava se
apoiar em dados de verdade, mostrar pelo menos um gráfico, seguir a estrutura
da jornada e ter os três ingredientes clássicos: um mentor, um desafio e uma
lição no fim.

Dois pesquisadores — um vindo do roteiro, outro do cinema — assistiram aos 48
vídeos e anotaram, trecho a trecho, o que acontecia na história, na imagem e
no som. Discutiram em várias rodadas até concordarem.

Para organizar tudo, cruzaram as três fases de Campbell com a **estrutura de
oito sequências**, o método que roteiristas usam para picar um filme em
blocos, cada um com uma função clara.

## O que entregaram

Um guia de design: **17 etapas** de história, cada uma com uma receita
própria de imagem e de som. São 6 etapas na partida, 7 na iniciação e 4 no
retorno (a lista completa está na Figura 3 do PDF).

| Fase | O que acontece | Etapa mais usada |
| --- | --- | --- |
| **Partida** | Apresenta os dados crus e mostra a descoberta que dá início à história | Despertar do dado — 22 dos 48 vídeos |
| **Iniciação** | Mergulha nos dados, enfrenta contradições e chega à virada | Provação pelo dado — 35 dos 48 |
| **Retorno** | Fecha a conta e mostra o que fazer com o que foi descoberto | Domínio dos insights — 32 dos 48 |

No **som**, separam três camadas: efeitos, música e narração. Cada etapa vira
uma curva de emoção ao longo do tempo. Na recompensa, por exemplo, a música
sobe e fica luminosa; na descoberta guiada ela recua para a narração aparecer.

Na **imagem**, catalogam animação, movimento de câmera, jeitos de apresentar
o gráfico (em pedaços, inteiro na tela, parado, com zoom) e corte.

## Funcionou?

Chamaram 20 pessoas de 21 a 40 anos, e só 3 conheciam a jornada do herói.
Metade recebeu o guia, metade só a teoria de sempre. Todos criaram histórias
com os mesmos dados: a trajetória da SpaceX e o crescimento da economia
chinesa.

Dois especialistas deram nota aos resultados. Quem usou o guia tirou **4,9 de
média; quem não usou tirou 3,2**. A diferença é grande demais para ser
coincidência, e apareceu nos quatro critérios avaliados: história, criatividade,
emoção e desenho dos gráficos. O maior salto foi justamente na emoção.

## Onde o guia não se sustenta

Ele foi feito para **histórias lineares, contadas por um narrador, com dados
que avançam no tempo**. Os próprios autores avisam: testaram em conjuntos de
dados simples e não garantem o mesmo resultado em casos mais embolados, como
uma fase com vários mentores ou uma história dentro da outra. Também admitem
que ainda não estudaram a fundo como efeito, música e narração se influenciam.

## O que isso muda no nosso projeto

O artigo fala de vídeo, não de dashboard. Usar as ideias dele aqui é uma
adaptação nossa, e vale dizer isso na apresentação se alguém perguntar.

A ponte é o modo apresentação: um capítulo por vez, em ordem fixa, com
narração ao vivo. Na prática, é um vídeo narrado — o formato que o artigo diz
funcionar. A aba dashboard resolve outro problema, o de deixar tudo à mão para
consulta.

Nossos seis capítulos encaixam nas etapas do guia: o mundo comum é o despertar
do dado, a enquete de 1988 é a provação pelo dado, a morte no cinema é o teste
final e o comparativo de eras é a recompensa.
