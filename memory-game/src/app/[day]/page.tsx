import Game from '@/components/game'
import styles from '../layout.module.scss'

type Props = {
  params: { day: number };
}

export default async function Home({ params }: Props) {
  const dayNumber = Number(params.day)
  
  // Fetch data using the enhanced get-ranking API
  let rows = []
  try {
    const response = await fetch(`http://localhost:3000/api/get-ranking?day=${dayNumber}`, {
      cache: 'no-store', // Disable caching to ensure fresh data
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    rows = data.rows || []
    console.log('Successfully fetched', rows.length, 'rows for day', dayNumber)
  } catch (error) {
    console.error('Error fetching ranking data:', error)
    rows = []
  }

  return (
    <main style={styles} className={`flex flex-col justify-center min-h-screen p-4 pt-0  md:mx-auto`}>

      {/* <h1 className='mb-5 text-4xl font-bold text-center text-gray-900'>
        KEMORY GAME
      </h1> */}

      <Game users={rows} day={dayNumber} />

    </main>
  )
}
