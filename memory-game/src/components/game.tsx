'use client'

import React from 'react'
import ListKards from './list-kards'
import KardForm from './kard-form'
import { useGameLogic } from '@/hooks/game'

const Game: React.FC = () => {
  const {
    attempts,
    win,
    theme,
    kards,
    startGame,
    setTheme,
    handleGenerateKards,
    setAttempts,
    setWin,
  } = useGameLogic()

  return (
    <>
      {!startGame && (
        <KardForm
          theme={theme}
          setTheme={setTheme}
          handleGenerateKards={handleGenerateKards}
        />
      )}

      {startGame && (
        <>
          {/* <h2 className='text-xl font-bold text-center text-gray-900'>
            Tema: <strong>{theme}</strong>
          </h2> */}

          {!win && (
            <h2 className='text-xl font-bold text-center text-gray-900'>
              Moviments: <strong>{attempts}</strong>
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
            <h2 className='text-xl font-bold text-center text-gray-900'>
              You win with <strong>{attempts}</strong> moviments!
            </h2>
          )}

          <button className='px-4 py-2 mt-4 text-white uppercase bg-red-500 rounded hover:bg-red-700'>
            <a href='/'>Play again</a>
          </button>
        </>
      )}
    </>
  )
}

export default Game
