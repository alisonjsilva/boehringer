import React from 'react'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

type Props = {
  card: IKard
  handleFlip: (id: number, matched: boolean) => void
}

const Kard: React.FC<Props> = ({ card, handleFlip }) => {
  const handleClick = () => {
    handleFlip(card.id, card.matched)
  }

  // {card.flipped ? card.image ?? card.defaultImage : card.defaultImage}
  return (
    <Card key={card.id} className={`py-3 relative bg-[#06312a] border-0 ${card.flipped ? "transition-all duration-500 [transform-style:preserve-3d] [transform:rotateY(360deg)]" ?? card.defaultImage : ""}`} onClick={handleClick}>

      {card.flipped ? (
        <Image
          src={card.image as string}
          alt='Picture of the author'
          // className='rounded-full [transform:rotateY(180deg)] [backface-visibility:hidden]'
          className='rounded-full'
          fill={true}
          style={{ "objectFit": "contain" }}
        />) : (
        <Image
          src={card.defaultImage}
          alt='Picture of the author'
          className={`rounded-full  `}
          fill={true}
          style={{ "objectFit": "contain" }}
          priority={true}
        />
      )
      }

      <Image
        src={card.image as string}
        alt='Picture of the author'
        className='rounded-full -z-10'
        fill={true}
        style={{ "objectFit": "contain" }}
      />

      {/* <Image
        src={card.flipped ? card.image ?? card.defaultImage : card.defaultImage}
        alt='Picture of the author'
        className={`rounded-full  `}
        fill={true}
        style={{ "objectFit": "contain" }}
      /> */}

    </Card>
  )
}

export default Kard
