/**
 * Valores em dólar com a unidade por extenso. A abreviação "mi" era ambígua
 * pro público (milhão ou mil?) e quebrava de vez acima de um bilhão: The
 * Dark Knight virava "US$ 1005 mi" em vez de "US$ 1,00 bilhão".
 */
export function formatUsd(value: number) {
  if (value >= 1_000_000_000) {
    const bilhoes = value / 1_000_000_000
    const texto = bilhoes.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    return `US$ ${texto} ${bilhoes >= 2 ? 'bilhões' : 'bilhão'}`
  }

  const milhoes = value / 1_000_000
  const texto = milhoes.toLocaleString('pt-BR', { maximumFractionDigits: 0 })
  return `US$ ${texto} ${milhoes >= 2 ? 'milhões' : 'milhão'}`
}
