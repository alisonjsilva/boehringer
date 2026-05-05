import Game from '@/components/game'
import styles from './layout.module.scss'
import { getRows, SHEETS } from '@/lib/google-sheets'

type Props = {
  params: { day: number };
}

export default async function Home({ params }: Props) {
  const day = params.day || 1
  
  let rows: any[] = []
  try {
    const allRows = await getRows(SHEETS.RANKING)
    
    if (allRows.length > 1) {
      // Header: [id, name, userid, moves, time, day, ranking_date]
      rows = allRows
        .slice(1)
        .map((row) => ({
          id: row[0],
          name: row[1],
          userid: row[2],
          moves: Number(row[3]),
          time: Number(row[4]),
          day: Number(row[5]),
          ranking_date: row[6],
        }))
        .filter((row) => row.day === Number(day))
        .sort((a, b) => {
          if (a.moves !== b.moves) return a.moves - b.moves
          if (a.ranking_date !== b.ranking_date) return b.ranking_date.localeCompare(a.ranking_date)
          return a.time - b.time
        })
        .slice(0, 5)
    }
  } catch (error) {
    console.error('Error fetching ranking:', error)
  }

  return (
    <main style={styles} className={`flex flex-col justify-center min-h-screen p-4 pt-0  md:mx-auto`}>
      <Game users={rows} day={params.day ? params.day : 1} />
    </main>
  )
}
