'use client'

import React, { Suspense } from 'react'
import ListKards from './list-kards'
import KardForm from './kard-form'
import { useGameLogic } from '@/hooks/game'
import Image from 'next/image'

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

  const [showForm, setShowForm] = React.useState(false)
  const [legalText, setLegalText] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

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

  async function handleStartGame(e: React.FormEvent) {
    setIsLoading(true)
    try {
      await handleGenerateKards(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-1 flex-col min-h-screen'>
      {/* Header with Essilor branding */}
      <header className='flex items-center justify-center gap-8 pt-8 pb-2 px-4'>
        <Image
          src="/v3/logo-essilor-01.png"
          alt="Essilor"
          width={120}
          height={120}
          className='object-contain'
          priority
        />
        <h1 className='text-4xl md:text-6xl font-extralight text-white tracking-wide'>
          Memory Game
        </h1>
      </header>

      {/* Main content */}
      <div className='flex flex-col flex-1 px-4 md:px-8 pb-4'>
        
        {/* Loading overlay */}
        {isLoading && (
          <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50'>
            <div className='flex flex-col items-center gap-4'>
              <div className='loading-spinner'></div>
              <p className='text-white text-lg font-light animate-pulse-slow'>Loading game...</p>
            </div>
          </div>
        )}

        {/* Form state */}
        {!startGame && showForm && (
          <div className='animate-fade-in-up max-w-md mx-auto w-full mt-4'>
            <KardForm
              theme={theme}
              setTheme={setTheme}
              handleGenerateKards={handleStartGame}
              setName={setName}
            />
            <button 
              className='w-full block px-6 py-3 mx-auto mt-4 text-white uppercase bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300'
              onClick={handleShowForm}
            >
              ← Back to Ranking
            </button>
          </div>
        )}

        {/* Ranking / Home state */}
        {!showForm && !startGame && (
          <div className='animate-fade-in-up max-w-lg mx-auto w-full mt-4'>
            <div className='bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10'>
              {users.length > 0 && (
                <Suspense fallback={
                  <div className='flex justify-center py-8'>
                    <div className='loading-spinner'></div>
                  </div>
                }>
                  <h2 className='text-2xl font-light text-center text-white mb-4'>🏆 Ranking</h2>
                  <div className='space-y-2'>
                    {users.map((user: any, index: number) => (
                      <div 
                        className='flex gap-4 items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors' 
                        key={user.id}
                      >
                        <div className='flex items-center gap-3'>
                          <span className='text-lg font-bold text-blue-300'>#{index + 1}</span>
                          <p className='text-white'>{user.name}</p>
                        </div>
                        <p className='text-blue-200 font-medium'>{user.moves} Moves</p>
                      </div>
                    ))}
                  </div>
                </Suspense>
              )}
              {users.length === 0 && (
                <p className='text-center text-white/60 py-4'>No scores yet. Be the first!</p>
              )}
            </div>
            <button
              type='button'
              className='w-full max-w-sm block px-6 py-4 mx-auto mt-6 text-white text-lg uppercase font-medium bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300'
              onClick={handleShowForm}
            >
              New Game
            </button>
          </div>
        )}

        {/* Game playing state */}
        {startGame && (
          <div className='animate-fade-in-up flex flex-col flex-1'>
            {!win && (
              <p className='text-lg text-center text-white/80 py-2 font-light tracking-wide'>
                Moves: {attempts}
              </p>
            )}

            <div className='game-container flex-1 flex items-center my-2'>
              <ListKards
                cards={kards}
                attempts={attempts}
                setAttempts={setAttempts}
                win={win}
                setWin={setWin}
              />
            </div>

            {win && (
              <div className='text-center mt-4 animate-fade-in-up'>
                <h2 className='text-2xl font-light text-white'>
                  🎉 You won in <strong className='text-blue-300'>{attempts}</strong> moves!
                </h2>
              </div>
            )}

            <div className='flex justify-center mt-4 mb-2'>
              <a 
                href={`/${day}`}
                className='px-16 py-3 text-white text-sm uppercase tracking-widest font-medium bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300'
              >
                Play Again
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Footer with legal text */}
      {legalText && (
        <footer className="px-4 pb-3 mt-auto">
          <p className="text-[6px] text-center text-white/40 leading-relaxed max-w-4xl mx-auto">
            {legalText}
          </p>
        </footer>
      )}
    </div>
  )
}
