import { getRandomImages } from '@/libs/cards'
import { formatCardsRandomly } from '@/libs/utils'
import { useState } from 'react'

export const useGameLogic = () => {
  const [attempts, setAttempts] = useState<number>(0)
  const [win, setWin] = useState<boolean>(false)
  const [theme, setTheme] = useState<string>('')
  const [kards, setKards] = useState<IKard[]>([])
  const [startGame, setStartGame] = useState<boolean>(false)

  const handleGenerateKards = async (e: React.FormEvent) => {
    e.preventDefault()

    const query = theme
    const numColumns = process.env.NEXT_PUBLIC_CARDS_NUM_COLUMNS as unknown as number
    const totalCards = Math.pow(numColumns, 2)
    const totalImages = totalCards / 2

    const cards: IKard[] = Array.from(Array(totalCards).keys()).map((i) => ({
      id: i,
      flipped: false,
      matched: false,
      defaultImage: '/bg-card.jpg',
    }))

    async function generateCards() {
      const imagesUrls = await getRandomImages(query, totalImages)
      const newCards = await formatCardsRandomly(cards, imagesUrls)
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
    setTheme,
    handleGenerateKards,
    setAttempts,
    setWin,
  }
}