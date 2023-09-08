import { useState, useEffect } from 'react'
import Kard from './kard'

type Props = {
  cards: IKard[]
  attempts: number
  setAttempts: (attempts: number) => void
  win: boolean
  setWin: (win: boolean) => void
}

const ListKards: React.FC<Props> = ({
  cards: initialCards,
  attempts,
  setAttempts,
  win,
  setWin,
}: Props) => {
  const [cards, setCards] = useState<IKard[]>(initialCards)
  const [cardsClicked, setCardsClicked] = useState<number[]>([])
  const [canClick, setCanClick] = useState(true)

  const flipCard = (id: number) => {
    if (!canClick || cardsClicked.length === 2 || cardsClicked.includes(id) || win) {
      return
    }

    const newCardsClicked = [...cardsClicked, id]
    setCardsClicked(newCardsClicked)

    const newCards = cards.map((card) => {
      if (card.id === id) {
        return {
          ...card,
          flipped: !card.flipped,
        }
      }
      return card
    })

    setCards(newCards)

    if (newCardsClicked.length === 2) {
      setCanClick(false)

      const [firstCard, secondCard] = newCardsClicked

      const firstCardObject = newCards.find((card) => card.id === firstCard) as IKard
      const secondCardObject = newCards.find((card) => card.id === secondCard) as IKard

      if (firstCardObject.image !== secondCardObject.image) {
        setTimeout(() => {
          const resetCards = newCards.map((card) => {
            if (card.id === firstCard || card.id === secondCard) {
              return {
                ...card,
                flipped: false,
              }
            }
            return card
          })

          setCards(resetCards)
          setCardsClicked([])
          setCanClick(true)
          setAttempts(attempts + 1)
        }, 1000)
      } else {
        const matchedCards = newCards.map((card) => {
          if (card.id === firstCard || card.id === secondCard) {
            return {
              ...card,
              matched: true,
            }
          }
          return card
        })

        setCards(matchedCards)

        const win = matchedCards.every((card) => card.matched)

        if (win) {
          setWin(true)
        }

        setAttempts(attempts + 1)
        setCardsClicked([])
        setCanClick(true)
      }
    }
  }

  useEffect(() => {
    if (cardsClicked.length === 2) {
      setCanClick(false)
    } else {
      setCanClick(true)
    }
  }, [cardsClicked])

  return (
    <div className='grid grid-cols-4 justify-center w-full gap-6'>
      {cards.map((card) => (
        <Kard key={card.id} card={card} handleFlip={flipCard} />
      ))}
    </div>
  )
}

export default ListKards
