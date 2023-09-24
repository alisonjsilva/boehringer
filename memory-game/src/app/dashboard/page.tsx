import Game from '@/components/game'
import styles from '../layout.module.scss'
import { sql } from '@vercel/postgres'
import RankingList from '@/components/dashboard/RankingList'
import ActionButtons from './ButtonActions'

type Props = {
  params: { day: number };
}
export default async function Home({ params }: Props) {

  const { rows, fields } = await sql`SELECT * FROM Ranking ORDER BY Day DESC, Moves ASC, Ranking_date DESC, Time;`
  // INSERT INTO Ranking (Name, Userid, Moves) VALUES ('Alison 2', 2, 11);
  // console.log(rows)

  return (
    <main style={styles} className={`flex flex-col justify-center min-h-screen p-4 pt-0  md:mx-auto bg-white`}>
      <ActionButtons />
      <RankingList />

    </main>
  )
}
