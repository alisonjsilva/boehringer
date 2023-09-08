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

  return (
    <Card key={card.id} className=' py-3 relative bg-[#1a3664] border-0' onClick={handleClick}>
    
      <Image
        src={card.flipped ? card.image ?? card.defaultImage : card.defaultImage}
        alt='Picture of the author'
        className='rounded-full'
        fill={true}
        style={{ "objectFit": "contain" }}
      />
      {/* <Image
        src={card.flipped ? card.image ?? card.defaultImage : card.defaultImage}
        alt='Picture of the author'
        width={170}
        height={170}
        className='object-fill h-full rounded-full'
      /> */}
      {/* <img
        src={card.flipped ? card.image ?? card.defaultImage : card.defaultImage}
        alt='Picture of the author'
        width={75}
        height={100}
        className='object-fill h-full rounded'
      /> */}
    </Card>
  )
}

export default Kard
