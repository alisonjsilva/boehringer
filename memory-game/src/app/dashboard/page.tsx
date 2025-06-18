import Game from '@/components/game'
import styles from '../layout.module.scss'
import RankingList from '@/components/dashboard/RankingList'
import ActionButtons from './ButtonActions'

type Props = {
  params: { day: number };
}

export default async function Home({ params }: Props) {
  // The query has been moved to RankingList component
  // This keeps the data fetching close to where it's being used

  return (
    <main style={styles} className={`flex flex-col justify-center min-h-screen p-4 pt-0  md:mx-auto bg-white`}>
      <ActionButtons />
      <RankingList />
    </main>
  )
}
