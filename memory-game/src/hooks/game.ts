'use client'
import { addUser } from '@/libs/add-user'
import { getRandomImages } from '@/libs/cards'
import { formatCardsRandomly } from '@/libs/utils'
import { use, useEffect, useState } from 'react'

export const useGameLogic = (day: number = 1) => {
  const [attempts, setAttempts] = useState<number>(0)
  const [win, setWin] = useState<boolean>(false)
  const [theme, setTheme] = useState<string>('')
  const [kards, setKards] = useState<IKard[]>([])
  const [startGame, setStartGame] = useState<boolean>(false)

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [score, setScore] = useState<number>(0)
  const [phone, setPhone] = useState<string>('')
  const [userId, setUserId] = useState<string>('')

  async function updateUserScore() {
    console.log('updateUserScore')
    if (!userId) return

    const response = await fetch(
      '/api/add-user-score',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          name,
          moves: attempts,
        }),
      }
    )
    return await response.json()
  }

  useEffect(() => {
    if (win) {
      updateUserScore()
    }
  }, [win])



  const handleGenerateKards = async (e: React.FormEvent) => {
    e.preventDefault()

    const query = theme
    const numColumns = 4 // process.env.NEXT_PUBLIC_CARDS_NUM_COLUMNS as unknown as number
    const totalCards = Math.pow(numColumns, 2)
    const totalImages = totalCards / 2

    const cards: IKard[] = Array.from(Array(totalCards).keys()).map((i) => ({
      id: i,
      flipped: false,
      matched: false,
      defaultImage: '/Icon00.png',
    }))

    async function generateCards() {
      const imagesUrls = await getRandomImages(query, totalImages, day)
      const newCards = await formatCardsRandomly(cards, imagesUrls)
      const { rows } = await addUser(name, email, phone)
      setUserId(rows[0]?.id)
      // console.log('rows', rows[0]?.id)
      return newCards
    }



    const newKards = await generateCards()

    setKards(newKards)
    setAttempts(0)
    setWin(false)
    setStartGame(true)
  }

  return {
    attempts,
    win,
    theme,
    kards,
    startGame,
    name,
    email,
    userId,
    setTheme,
    handleGenerateKards,
    setAttempts,
    setWin,
    setName,
    setEmail,
    setScore,
    setPhone,
  }
}