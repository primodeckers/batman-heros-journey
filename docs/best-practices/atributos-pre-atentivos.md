# Atributos pré-atentivos

Atributos pré-atentivos (Colin Ware, *Information Visualization: Perception
for Design*) são propriedades visuais que o cérebro processa em menos de
~250ms, antes de qualquer atenção consciente — é por isso que um ponto
vermelho entre 50 azuis "salta aos olhos" sem precisar procurar um por um.
Usar esses atributos certo é o que faz um gráfico ser lido em segundos; usar
errado (ou usar todos ao mesmo tempo) produz ruído que compete por atenção
e anula o efeito.

Isso é diferente de affordance (`affordances-visuais.md`, comunica o que dá
pra *fazer*) e de Gestalt (`gestalt-principles.md`, organiza como os
elementos se *agrupam*): atributo pré-atentivo é sobre o que salta aos
olhos **primeiro**, antes de qualquer leitura ou agrupamento consciente.

## Os atributos principais (Ware)

| Categoria | Atributos | Força perceptiva |
| --- | --- | --- |
| Cor | matiz (hue), intensidade/luminância | Muito forte, mas satura rápido (>1 destaque = nenhum destaque) |
| Forma | orientação, tamanho, formato, comprimento, largura, curvatura | Forte para diferença categórica ou de magnitude |
| Espaço | posição 2D, agrupamento espacial (enclosure) | Base de todo gráfico de posição (barra, dispersão) |
| Movimento | flicker, direção, velocidade | O mais forte de todos — por isso deve ser raríssimo e só pro dado mais importante |

Nem todos têm a mesma força: cor e movimento vencem qualquer disputa visual
contra forma ou tamanho. Combinar dois atributos fracos (ex.: forma +
posição) num mesmo dado reforça a leitura; combinar dois atributos fortes
em dados diferentes (ex.: cor forte num dado e movimento forte em outro)
faz o olho não saber pra onde ir.

## Regras pra este projeto

- **Um atributo pré-atentivo forte por vez, por tela.** Se o accent
  (`cor-e-acessibilidade.md`) já marca o dado-chave, não adicione também
  animação/movimento em outro elemento da mesma visualização — os dois vão
  competir.
- **Movimento é o mais caro — gaste com cuidado.** Reservado só pro estado
  que o usuário escolheu ativamente (ex.: o anel pulsante no país
  selecionado do mapa-múndi) ou pra transição que confirma uma ação (fly-to
  ao clicar). Nunca usar movimento contínuo em elemento que não é o foco da
  interação — vira ruído permanente.
- **Tamanho/posição para magnitude, cor para categoria.** Não usar a mesma
  variável de dado codificada em dois atributos pré-atentivos redundantes
  sem motivo (desperdiça um canal que poderia comunicar outra coisa), mas
  também não é erro reforçar um dado crítico com 2 atributos (ex.: o ponto
  mais alto do gráfico também em cor de destaque) — a regra é intencional
  vs. acidental.
- **Pré-atentivo não substitui rótulo.** Um atributo visual faz o olho
  encontrar o dado; o título narrativo e o rótulo explicam por que aquele
  dado importa. Um sem o outro é incompleto.

## Aplicação no projeto (exemplos já existentes)

- `AIWorldUsageMap`: cor sequencial (matiz/intensidade) codifica a métrica
  selecionada; movimento (anel pulsante) é reservado exclusivamente ao país
  selecionado — não usado em mais nada na mesma tela.
- `AITrustDivergingChart`: posição (barra pra esquerda/direita do zero) +
  cor (accent vs. neutro) reforçam juntos a mesma leitura de
  confiança/desconfiança — reforço intencional, não redundância acidental.
- `AIAdoptionPictogram`: tamanho de grupo (contagem de ícones) é o atributo
  primário; cor só diferencia categoria, não compete com o tamanho.

## Checklist rápido

- [ ] Existe só um atributo pré-atentivo "forte" (cor de destaque ou
      movimento) por visualização?
- [ ] Movimento é usado só pra estado ativo/selecionado, nunca decorativo?
- [ ] Cada atributo usado (cor, tamanho, posição, forma) mapeia pra uma
      variável de dado clara — nenhum é só estética?
- [ ] O atributo pré-atentivo aponta pro mesmo dado que o título narrativo
      afirma?

## Referências
- Colin Ware — *Information Visualization: Perception for Design* (2012)
- Stephen Few — [*Practical Rules for Using Color in Charts*](https://www.perceptualedge.com/articles/visual_business_intelligence/rules_for_using_color.pdf) — aplicação de atributos pré-atentivos especificamente a cor em dashboards
