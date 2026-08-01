/**
 * Parede de capas de gibis do Batman como fundo do dashboard.
 * Fileiras intercaladas (estilo tijolo): cada linha começa na metade da capa de cima.
 */
const COVER_FILES = [
  'cover-01.jpg',
  'cover-02.jpg',
  'cover-03.jpg',
  'cover-04.jpg',
  'cover-05.jpg',
  'cover-06.jpg',
  'cover-07.jpg',
  'cover-08.jpg',
  'cover-09.jpg',
  'cover-10.jpg',
  'cover-11.jpg',
  'cover-12.jpg',
  'cover-13.jpg',
  'cover-14.jpg',
  'cover-15.jpg',
  'cover-16.jpg',
  'cover-17.jpg',
  'cover-19.png',
] as const

/** Capas por fileira — um pouco a mais pra sobrar nas linhas deslocadas. */
const COVERS_PER_ROW = 10
const ROW_COUNT = 8

function buildRows(): string[][] {
  const pool = Array.from(
    { length: ROW_COUNT * COVERS_PER_ROW },
    (_, i) => COVER_FILES[i % COVER_FILES.length],
  )
  const rows: string[][] = []
  for (let r = 0; r < ROW_COUNT; r++) {
    const start = r * COVERS_PER_ROW
    rows.push(pool.slice(start, start + COVERS_PER_ROW))
  }
  return rows
}

const ROWS = buildRows()

export function ComicBackground() {
  return (
    <div className="comic-covers-bg" aria-hidden="true">
      <div className="comic-covers-grid">
        {ROWS.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={
              rowIndex % 2 === 1 ? 'comic-covers-row comic-covers-row--offset' : 'comic-covers-row'
            }
          >
            {row.map((file, colIndex) => (
              <img
                key={`${rowIndex}-${colIndex}-${file}`}
                src={`/covers/${file}`}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="comic-covers-overlay" />
    </div>
  )
}
