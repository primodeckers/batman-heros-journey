/**
 * Centróides aproximados dos países presentes em epoch-ai-data-centers.csv,
 * em [longitude, latitude] (convenção GeoJSON). Usado só pra posicionar a
 * bolha do país no mapa — não são coordenadas reais de cada data center
 * (o dataset não tem lat/lon por instalação, só "Country" e "Address").
 */
export const countryCentroids: Record<string, [number, number]> = {
  'United States': [-98.6, 39.8],
  Malaysia: [101.9, 4.2],
  'United Kingdom': [-2.0, 54.0],
  China: [105.0, 35.0],
  Indonesia: [113.9, -0.7],
  Portugal: [-8.0, 39.5],
  'United Arab Emirates': [54.0, 24.0],
  Australia: [133.0, -25.0],
}
