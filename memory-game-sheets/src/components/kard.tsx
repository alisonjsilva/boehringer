'use client'
import React from 'react'
import Image from 'next/image'

type Props = {
  card: IKard
  handleFlip: (id: number, matched: boolean) => void
  isNewlyMatched?: boolean
  animationDelay?: number
}

const Kard: React.FC<Props> = ({ card, handleFlip, isNewlyMatched, animationDelay = 0 }) => {
  const handleClick = () => {
    if (card.matched) return
    handleFlip(card.id, card.matched)
  }

  return (
    <div 
      className={`
        relative aspect-[2/3] cursor-pointer
        [perspective:1000px]
        transition-transform duration-200
        ${!card.matched && !card.flipped ? 'hover:scale-[1.03] hover:z-10' : ''}
        ${isNewlyMatched ? 'animate-[cardMatch_0.5s_ease-in-out]' : ''}
      `}
      style={{ animationDelay: `${animationDelay}ms` }}
      onClick={handleClick}
    >
      <div className={`
        relative w-full h-full transition-transform duration-500
        [transform-style:preserve-3d]
        ${card.flipped ? '[transform:rotateY(180deg)]' : ''}
      `}>
        {/* Back of card (REVERSO) */}
        <div className='absolute inset-0 [backface-visibility:hidden] rounded-xl overflow-hidden shadow-md'>
          <Image
            src={card.defaultImage}
            alt='Card back'
            fill={true}
            style={{ objectFit: "cover" }}
            priority={true}
          />
        </div>

        {/* Front of card (image) */}
        <div className='absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl overflow-hidden shadow-md'>
          <Image
            src={card.image as string}
            alt='Card front'
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  )
}

export default Kard
