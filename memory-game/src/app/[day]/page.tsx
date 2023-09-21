import Game from '@/components/game'
import styles from '../layout.module.scss'
import { sql } from '@vercel/postgres'

type Props = {
  day?: number
  params: { day: number };
}
export default async function Home({ params }: Props) {

  const { rows, fields } = await sql`SELECT * FROM Ranking ORDER BY Moves ASC, Ranking_date DESC LIMIT 5;`
  // INSERT INTO Ranking (Name, Userid, Moves) VALUES ('Alison 2', 2, 11);
  // console.log(rows)

  return (
    <main style={styles} className={`flex flex-col justify-center min-h-screen p-4 pt-0  md:mx-auto`}>

      {/* <h1 className='mb-5 text-4xl font-bold text-center text-gray-900'>
        KEMORY GAME
      </h1> */}

      <Game users={rows} day={params.day ? params.day : 1} />

    </main>
  )
}
