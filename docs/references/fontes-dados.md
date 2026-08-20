# Fontes de dados

## Já em uso

| Fonte | Link | Dataset usado | Data de acesso | Arquivo local |
| --- | --- | --- | --- | --- |
| Box Office Mojo | [boxofficemojo.com](https://www.boxofficemojo.com/) | Bilheteria mundial de cada filme live-action do Batman (1989-2022) | 01/08/2026 | `public/data/batman-boxoffice.csv` |
| Rotten Tomatoes | [rottentomatoes.com](https://www.rottentomatoes.com/) | Nota do Tomatometer (crítica) de cada filme | 01/08/2026 | `public/data/batman-boxoffice.csv` |
| Wikipedia (verificado contra Box Office Mojo/Wikipedia por filme) | [en.wikipedia.org/wiki/Batman_in_film](https://en.wikipedia.org/wiki/Batman_in_film) | Orçamento de produção de cada filme | 01/08/2026 | `public/data/batman-boxoffice.csv` |
| Wikipedia — *A Death in the Family (comics)* | [en.wikipedia.org/wiki/A_Death_in_the_Family_(comics)](https://en.wikipedia.org/wiki/A_Death_in_the_Family_(comics)) | Resultado da enquete de 1988 (votos por telefone) | 01/08/2026 | `public/data/batman-death-poll.csv` |
| Créditos de elenco de cada filme (Wikipedia) | [en.wikipedia.org/wiki/Batman_in_film](https://en.wikipedia.org/wiki/Batman_in_film) | Vilão principal e ator de cada filme (1989-2022) | 01/08/2026 | `public/data/batman-villains.csv` |
| Créditos de direção e elenco (Wikipedia) | [en.wikipedia.org/wiki/Batman_in_film](https://en.wikipedia.org/wiki/Batman_in_film) | Diretor, intérprete do Batman e elenco de apoio de cada filme (1989-2022) — mostrados no tooltip do gráfico de bilheteria | 20/08/2026 | `public/data/batman-boxoffice.csv` |
| Wikipedia — *Batman: Knightfall* | [en.wikipedia.org/wiki/Batman:_Knightfall](https://dc.fandom.com/wiki/Batman:_Knightfall) | Bane quebra a coluna do Batman em *Batman* #497 (jul/1993) | 01/08/2026 | `public/data/batman-comics-timeline.csv` |
| Wikipedia — *Batman: Under the Hood* | [en.wikipedia.org/wiki/Batman:_Under_the_Hood](https://en.wikipedia.org/wiki/Batman:_Under_the_Hood) | Ressurreição de Jason Todd (fev/2005) | 01/08/2026 | `public/data/batman-comics-timeline.csv` |
| CBR — *The Return of Bruce Wayne* | [cbr.com/batman-bruce-wayne-return-explainer](https://www.cbr.com/batman-bruce-wayne-return-explainer/) | Batman R.I.P. (2008) → Final Crisis (2008-09) → retorno de Bruce Wayne (2010) | 01/08/2026 | `public/data/batman-comics-timeline.csv` |
| Wikipedia — *Detective Comics* #27, *Batman (serial)*, *Batman (1966 TV series)* | [en.wikipedia.org/wiki/Batman](https://en.wikipedia.org/wiki/Batman) | 6 marcos de adaptação em quadrinhos/cinema/TV (1939-2022) | 01/08/2026 | `public/data/batman-adaptations-timeline.csv` |

**Nota sobre orçamento de *Batman & Robin* (1997):** fontes divergem entre
US$ 125 mi e US$ 160 mi (a diferença provavelmente é produção vs.
produção+marketing). Usamos US$ 125 mi (o valor mais citado como orçamento
de produção) — mencionar a divergência se o número for citado na
apresentação (ver `linguagem-e-clareza.md`, item 6).

**Detalhe da enquete "A Death in the Family" (1988):** 10.614 votos totais
— 5.343 a favor da morte do Robin (Jason Todd), 5.271 a favor de salvá-lo.
Margem de 72 votos. Ligações por 36h a 50¢ cada, para um de dois números
1-900. Amplamente documentado (ex.: cobertura da ComicBook.com, Gizmodo, TV
Tropes, além da Wikipedia).

## Descartado por inconsistência entre fontes

- **Bilheteria por ator ajustada por inflação** (candidato ao gráfico
  bônus "o ciclo se repete"): ScreenRant e Box Office Mojo têm números que
  não batem entre si pros mesmos filmes — parece que umas fontes ajustam
  só a bilheteria doméstica e outras tentam ajustar a mundial (metodologia
  não é comparável entre ticket-price inflation dos EUA e câmbio
  internacional). Em vez de montar gráfico com número que não fecha,
  deixamos esse de fora até achar uma fonte única e consistente pros 8
  filmes.

## Fontes pesquisadas pro gráfico bônus (ainda não usadas)

- **[FiveThirtyEight — Comic Characters Dataset](https://github.com/fivethirtyeight/data/tree/master/comic-characters)**:
  23.272 personagens Marvel+DC (16.376 Marvel / 6.896 DC), raspado das
  Wikias em 2014. Colunas: alinhamento (herói/vilão/neutro), status
  vivo/morto, nº de aparições (foto única de set/2014, **não é série
  temporal**), mês/ano da 1ª aparição. Útil pra contexto de longevidade do
  personagem, não pra gráfico de "popularidade ano a ano".
- **[Marvel Universe Social Network](https://github.com/melaniewalsh/sample-social-network-datasets/tree/master/sample-datasets/marvel)**
  (Rosselló, Alberich & Miró, do Marvel Chronology Project): rede de
  coaparições de personagens Marvel (1961-2000). **Limitação: é só Marvel,
  não existe equivalente pronto pra DC/Batman** — pra usar aqui precisaria
  compilar manualmente de alguma wiki.
- **[Marvel Developer API](https://developer.marvel.com/)**: dados oficiais
  em tempo real, mas limitado a 20 resultados por requisição — ok pra
  consulta pontual, não pra puxar histórico completo.

## Fontes abertas sugeridas (uso geral)
- [IBGE](https://www.ibge.gov.br/)
- [Our World in Data](https://ourworldindata.org/)
- [Kaggle](https://www.kaggle.com/datasets)
