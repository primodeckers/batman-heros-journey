/**
 * Nomes de país divergem entre a fonte de dado (Anthropic Economic Index)
 * e o topojson do mapa (world-atlas, resolução 110m). Mapeia nosso nome
 * → nome usado no topojson. Países muito pequenos (Singapura, Malta,
 * Mônaco, San Marino, Liechtenstein...) não existem como polígono
 * separado nessa resolução — ficam de fora do mapa, mas aparecem no
 * ranking em texto.
 */
export const countryNameAliases: Record<string, string> = {
  'Bosnia and Herzegovina': 'Bosnia and Herz.',
  'Republic of the Congo': 'Congo',
  'Dominican Republic': 'Dominican Rep.',
  'North Macedonia': 'Macedonia',
  'The Netherlands': 'Netherlands',
  'Timor Leste': 'Timor-Leste',
  'United States': 'United States of America',
  'Ivory Coast': "Côte d'Ivoire",
}
