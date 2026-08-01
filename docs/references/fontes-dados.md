# Fontes de dados

## Já em uso

| Fonte | Link | Dataset usado | Data de acesso | Arquivo local |
| --- | --- | --- | --- | --- |
| Box Office Mojo | [boxofficemojo.com](https://www.boxofficemojo.com/) | Bilheteria mundial de cada filme live-action do Batman (1989-2022) | 01/08/2026 | `public/data/batman-boxoffice.csv` |
| Rotten Tomatoes | [rottentomatoes.com](https://www.rottentomatoes.com/) | Nota do Tomatometer (crítica) de cada filme | 01/08/2026 | `public/data/batman-boxoffice.csv` |
| Wikipedia (verificado contra Box Office Mojo/Wikipedia por filme) | [en.wikipedia.org/wiki/Batman_in_film](https://en.wikipedia.org/wiki/Batman_in_film) | Orçamento de produção de cada filme | 01/08/2026 | `public/data/batman-boxoffice.csv` |

**Nota sobre orçamento de *Batman & Robin* (1997):** fontes divergem entre
US$ 125 mi e US$ 160 mi (a diferença provavelmente é produção vs.
produção+marketing). Usamos US$ 125 mi (o valor mais citado como orçamento
de produção) — mencionar a divergência se o número for citado na
apresentação (ver `linguagem-e-clareza.md`, item 6).

## Números-chave já conferidos (não estão em CSV ainda — candidatos a
próximo gráfico)

- **Enquete "A Death in the Family" (1988):** 10.614 votos totais — 5.343 a
  favor da morte do Robin (Jason Todd), 5.271 a favor de salvá-lo. Margem
  de 72 votos. Ligações por 36h a 50¢ cada, para um de dois números 1-900.
  Amplamente documentado (ex.: cobertura da ComicBook.com, Gizmodo, TV
  Tropes, Wikipedia — *A Death in the Family (comics)*).

## Fontes pesquisadas pra próximos gráficos (ainda não baixadas/processadas)

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
