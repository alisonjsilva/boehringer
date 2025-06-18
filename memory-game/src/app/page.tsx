import Game from '@/components/game'
import styles from './layout.module.scss'
import { createServerSupabaseClient } from '@/lib/supabase'

type Props = {
  params: { day: number };
}

export default async function Home({ params }: Props) {
  const supabase = createServerSupabaseClient()
  
  const { data: rows, error } = await supabase
    .from('ranking')
    .select('*')
    .eq('day', params.day || 1)
    .order('moves', { ascending: true })
    .order('ranking_date', { ascending: false })
    .order('time', { ascending: true })
    .limit(5)

  if (error) {
    console.error('Error fetching ranking:', error)
  }

  return (
    <main style={styles} className={`flex flex-col justify-center min-h-screen p-4 pt-0  md:mx-auto`}>

      {/* <h1 className='mb-5 text-4xl font-bold text-center text-gray-900'>
        KEMORY GAME
      </h1> */}

      <Game users={rows || []} day={params.day ? params.day : 1} />

    </main>
  )
}
