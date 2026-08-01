# Linguagem e clareza

Um dado correto e bem desenhado ainda pode falhar em comunicar se a
**linguagem** ao redor dele (título, legenda, texto de apoio, fala na
apresentação) não ajuda a audiência a entender e lembrar. Este doc cobre o
lado verbal/cognitivo da narrativa — complementa `selecao-de-graficos.md`
(qual gráfico) e `cor-e-acessibilidade.md`/`atributos-pre-atentivos.md`
(como o olho lê), mas foca em como as **palavras** e a **carga de
informação** ajudam ou atrapalham.

## 1. Verbos ativos, não jargão

- Prefira verbo de ação a substantivo abstrato: "IA ultrapassou" em vez de
  "houve uma ultrapassagem da IA em relação a".
- Termo técnico (RCT, per capita, quantil, telemetria) só entra se for
  necessário pra precisão — e sempre com uma explicação de uma linha na
  primeira aparição, não assumido como conhecido.
- Teste rápido: se teria que explicar a frase de novo em voz alta durante
  a apresentação, ela está densa demais pro slide/card.

## 2. Esclarecimento de acrônimos

- Todo acrônimo (RCT, GDP/PIB, OSS, NBER, METR) precisa aparecer por
  extenso na primeira vez que surge naquele card/seção — não basta ter
  sido explicado em outro gráfico do dashboard, porque o usuário pode
  entrar direto naquela tela.
- Acrônimos muito conhecidos do domínio do público (IA, GitHub) não
  precisam de explicação — regra é conhecimento do **público-alvo da
  apresentação**, não do autor.

## 3. Escala relacionável

Número grande sem comparação não comunica magnitude — o cérebro não tem
uma intuição nativa pra "70.000" ou "981%". Ancorar em algo relacionável
resolve isso:

- **Tamanho/quantidade**: "isso equivale a X" usando algo do cotidiano do
  público (não "campos de futebol" genérico se não for relevante — usar
  algo que conecte com o tema, ex.: "index"/"x vezes a média mundial" já
  usado no mapa de uso de IA).
- **Tempo**: taxas e durações ganham força quando viram "isso levaria X
  anos" ou "isso é Y vezes mais rápido que Z" em vez de só a unidade bruta.
- **Proporção humana**: "79 em cada 100 devs" comunica mais rápido que
  "79%" sozinho — já é o padrão usado no `AIAdoptionPictogram`.

## 4. Conectar com o tempo

- Toda métrica isolada ("46% desconfiam") ganha força quando comparada a
  um ponto anterior no tempo ou a uma tendência — "vs. X% no ano
  anterior", "crescendo desde 2020". Métrica sem contexto temporal é dado;
  com contexto temporal vira história.
- Cuidado com o inverso: comparar períodos não comparáveis (amostras
  diferentes, metodologia diferente) é enganoso — sinalizar a diferença
  metodológica explicitamente se ela existir (ver notas de fonte em
  `fontes-dados.md`).

## 5. Expressar sentimento com dado

- Dado tem carga emocional real (confiança, medo, orgulho, surpresa) — 
  reconhecer isso na palavra escolhida é mais honesto que fingir
  neutralidade robótica. "Devs se enganam sobre a própria velocidade"
  (já usado) comunica surpresa; "Discrepância entre percepção e medição"
  comunicaria a mesma coisa sem nenhum gancho emocional.
- Limite: expressar sentimento não é dramatizar o dado além do que ele
  sustenta (ver item 6, "comemorar vs. simplificar" e a regra de
  affordance falsa em `affordances-visuais.md` — o equivalente verbal é
  não prometer uma conclusão que o gráfico não entrega).

## 6. Comemorar vs. simplificar (não emburrecer)

- **Comemorar**: quando o dado sustenta uma conclusão forte e clara, dizer
  isso sem hedging excessivo — "TypeScript cresceu 4,6x" é melhor que "os
  dados sugerem um possível crescimento no uso de TypeScript".
- **Simplificar sem emburrecer**: cortar complexidade acessória (métrica
  secundária, ressalva estatística de detalhe) é bom; cortar a ressalva
  que muda a conclusão (ex.: "RCT com 16 devs, não é universal" no card do
  METR) é desonesto, não simples. A régua: simplificação corta *forma*,
  nunca corta *o que muda a conclusão*.
- Quando o dado é ambíguo ou fraco, a linguagem honesta é dizer isso — não
  compensar com um título mais confiante do que o dado sustenta.

## 7. Carga cognitiva e saturação de informação

Diferente de saturação de cor (`cor-e-acessibilidade.md`, item 4) — aqui é
sobre **quantidade de informação simultânea**, não intensidade de cor.

- Cada card mostra o suficiente pra responder a UMA pergunta — dado extra
  "porque pode ser interessante" é custo cognitivo sem retorno.
- Regra prática: se remover uma informação do card e a conclusão do título
  continua sustentada, ela era saturação, não sinal — considerar mover pra
  tooltip (item 8) ou remover.
- Texto de apoio (subtítulo, legenda, nota de fonte) usa hierarquia
  tipográfica clara (tamanho/peso) pra sinalizar o que é essencial vs.
  contexto — não colocar tudo no mesmo peso visual.

## 8. Tooltips e dicas nos gráficos

- Tooltip é o lugar certo pra detalhe que enriquece mas não é essencial
  pra conclusão do título (valor exato, comparação extra, nota
  metodológica pontual) — mantém o card principal limpo (item 7) sem
  esconder informação de quem quer se aprofundar.
- Tooltip não deve ser onde a conclusão principal mora — se o usuário
  precisa passar o mouse pra entender do que o gráfico trata, o design
  falhou (ver `affordances-visuais.md`, item 4: interação não óbvia
  precisa de legenda visível, tooltip não conta como legenda visível).
- Dica textual curta abaixo/ao lado do gráfico (como already usado no
  mapa: "Arraste pra mover, role pra dar zoom...") documenta a interação
  que o tooltip por si só não ensina.

## 9. STAR Moment — Something They'll Always Remember

Conceito de Nancy Duarte (*Resonate*, 2010, mesma autora do *DataStory* já
citado em `bibliografia.md`): um momento deliberado na apresentação — uma
frase quotável, um dado chocante, uma demonstração ao vivo — plantado de
propósito pra ser o que a audiência lembra e reconta depois. Não é o
resumo da apresentação, é **um** momento específico, memorável e
repetível.

- Escolher **um** STAR Moment pra apresentação de 10 min deste projeto —
  candidato natural: "Israel usa IA 7x mais que a média mundial" (já é
  concreto, comparável, surpreendente) ou o achado do funil de atenuação
  de produtividade (ganho de +981% na escrita que murcha pra +10-29% no
  produto final — a "weak-link hypothesis").
- Um STAR Moment por apresentação — múltiplos "momentos memoráveis"
  competem entre si e nenhum fica (mesmo princípio do item 7: excesso de
  destaque = nenhum destaque, ver `atributos-pre-atentivos.md`).
- Ensaiar o STAR Moment com a mesma frase todas as vezes — repetibilidade
  da frase exata é parte do que faz ela ser lembrada e citável.

## Checklist rápido

- [ ] Todo acrônimo é explicado na primeira aparição daquela tela?
- [ ] Todo número grande tem uma âncora relacionável (proporção, "x vezes",
      tempo)?
- [ ] Cada métrica isolada tem contexto temporal (comparado a quando)?
- [ ] O tom da linguagem (comemorar vs. cauteloso) é proporcional ao que o
      dado realmente sustenta?
- [ ] Nenhuma ressalva que muda a conclusão foi cortada em nome de
      simplicidade?
- [ ] Cada card tem só a informação essencial pra sua pergunta — o resto
      está em tooltip ou foi removido?
- [ ] Existe exatamente 1 STAR Moment definido pro roteiro de 10 min?

## Referências
- Nancy Duarte — *Resonate: Present Visual Stories that Transform
  Audiences* (2010) — origem do conceito STAR Moment
- Brent Dykes — *Effective Data Storytelling: How to Drive Change with
  Data, Narrative, and Visuals* (2019) — linguagem, comparações de escala e
  humanização de números
- Cole Nussbaumer Knaflic — *Storytelling with Data* (já em
  `bibliografia.md`)
