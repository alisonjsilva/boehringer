import styles from '../layout.module.scss'
import RankingList from '@/components/dashboard/RankingList'
import ActionButtons from './ButtonActions'

type Props = {
  params: { day: number };
}

export default async function Home({ params }: Props) {
  return (
    <main style={styles} className={`flex flex-col justify-center min-h-screen p-4 pt-0  md:mx-auto bg-white`}>
      <ActionButtons />
      <RankingList />
    </main>
  )
}
