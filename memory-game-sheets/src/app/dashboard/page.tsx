import RankingList from '@/components/dashboard/RankingList'
import ActionButtons from './ButtonActions'

type Props = {
  params: { day: number };
}

export default async function Home({ params }: Props) {
  return (
    <main className='flex flex-col min-h-screen p-6 bg-slate-900'>
      <h1 className='text-2xl font-light text-white text-center mb-6'>Dashboard</h1>
      <ActionButtons />
      <RankingList />
    </main>
  )
}
