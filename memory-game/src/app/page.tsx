import Game from '@/components/game'

export default async function Home() {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen p-4 pt-0 md:w-1/2 md:mx-auto'>
      
      <h1 className='mb-5 text-4xl font-bold text-center text-gray-900'>
        KEMORY GAME
      </h1>

      <Game />
      
    </main>
  )
}
