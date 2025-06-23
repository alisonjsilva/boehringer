'use client'

import React, { Suspense } from 'react'
import ListKards from './list-kards'
import KardForm from './kard-form'
import { useGameLogic } from '@/hooks/game'
import styles from './game.module.scss'

type Props = {
  users: any
  day?: number
}

export default function Game({ users, day = 1 }: Props) {
  const {
    attempts,
    win,
    theme,
    kards,
    startGame,
    name,
    userId,
    setTheme,
    handleGenerateKards,
    setAttempts,
    setWin,
    setName,
  } = useGameLogic(day)
  console.log('users', users)

  const [showForm, setShowForm] = React.useState(false)
  const [legalText, setLegalText] = React.useState('')

  React.useEffect(() => {
    async function fetchLegalText() {
      try {
        const response = await fetch(`/api/get-legal-text?day=${day}`)
        const data = await response.json()
        setLegalText(data.text || '')
      } catch (error) {
        console.error('Error fetching legal text:', error)
      }
    }
    
    fetchLegalText()
  }, [day])

  function handleShowForm() {
    setShowForm(!showForm)
  }

  return (
    <div className='flex flex-1 flex-col'>
      <div style={styles} className={`${styles.bgTop} flex-1`}>

      </div>
      <div className='flex flex-col flex-1'>
        {!startGame && showForm && (
          <>
            <KardForm
              theme={theme}
              setTheme={setTheme}
              handleGenerateKards={handleGenerateKards}
              setName={setName}
            />
            <button className='w-full block px-4 py-2 mx-auto mt-4 text-white uppercase bg-red-500 rounded hover:bg-red-700'>
              <a href='/'>{"< "}Back to Ranking</a>
            </button>
          </>
        )}

        {!showForm && (
          <div>
            <div className='flex justify-center text-gray-100'>

              <div className='flex flex-col text-center'>
                {users.length > 0 && (
                  <Suspense fallback={<div>Loading...</div>}>
                    <div className='text-xl pb-4'>Ranking</div>
                    {users.map((user: any) => (
                      <div className='py-2 flex gap-4 border-b justify-between' key={user.id}>
                        <p>{user.name}</p>
                        <p>{user.moves} Moves</p>
                      </div>
                    ))}
                  </Suspense>
                )}

              </div>
            </div>
            <button
              type='submit'
              className='w-full block px-4 py-2 mx-auto mt-4 text-[#06312a] uppercase bg-gray-300 rounded-lg hover:bg-gray-400'
              onClick={handleShowForm}
            >
              New Game
            </button>
          </div>
        )}



        {startGame && (
          <>
            {/* <h2 className='text-xl font-bold text-center text-gray-900'>
            Tema: <strong>{theme}</strong>
          </h2> */}

            {!win && (
              <h2 className='text-xl  text-center text-gray-200 pb-6'>
                Moves: <strong>{attempts}</strong>
              </h2>
            )}

            <ListKards
              cards={kards}
              attempts={attempts}
              setAttempts={setAttempts}
              win={win}
              setWin={setWin}
            />

            {win && (
              <h2 className='text-xl font-bold text-center text-gray-200 mt-6'>
                You won in <strong>{attempts}</strong> moves
              </h2>
            )}

            <button className='px-4 py-2 mt-4 text-white uppercase bg-red-500 rounded hover:bg-red-700'>
              <a href={`/${day}`}>Play again</a>
            </button>
          </>
        )}
      </div>
      <div className={`${styles[`bgFooter${day}`]} flex-1 flex flex-col justify-end`}>
        {legalText && (
          <div className="px-4 pb-4">
            <p className="text-[8px] text-center text-white leading-relaxed">
              {legalText}
            </p>
          </div>
        )}
      </div>

    </div>
  )
}

// export default Game
