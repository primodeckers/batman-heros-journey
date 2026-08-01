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

## Regras pra este projeto

- **Um atributo pré-atentivo forte por vez, por tela.** Se o accent
  dourado já marca o dado-chave, não adicione também animação/movimento em
  outro elemento da mesma visualização.
- **Movimento é o mais caro — gaste com cuidado.** Reservado só pro estado
  que o usuário escolheu ativamente ou pra transição que confirma uma
  ação — nunca contínuo em elemento que não é o foco.
- **Tamanho/posição para magnitude, cor para categoria/qualidade.**

## Aplicação no projeto (exemplos já existentes)

- `BatmanBoxOfficeChart`: altura da barra (posição/tamanho) codifica
  bilheteria; cor (dourado vs. cinza-escuro) codifica nota do Rotten
  Tomatoes — os dois atributos reforçam juntos a mesma leitura de "1997 foi
  ruim e pequeno, 2008 foi ótimo e grande", reforço intencional, não
  redundância acidental.
- Contorno mais grosso (`stroke`) isola visualmente *Batman & Robin* como o
  ponto de virada da narrativa, sem precisar de uma segunda cor de
  destaque competindo com a escala sequencial.

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
- Stephen Few — [*Practical Rules for Using Color in Charts*](https://www.perceptualedge.com/articles/visual_business_intelligence/rules_for_using_color.pdf)
