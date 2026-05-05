import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const shuffleArray = (array: string[]): string[] => {
  const newArray = [...array]

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }

  return newArray
}

export const formatCardsRandomly = async (cards: any, imagesUrls: any): Promise<IKard[]> => {
  const duplicatedImages = [...imagesUrls, ...imagesUrls]
  const shuffledImages = duplicatedImages.sort(() => 0.5 - Math.random())

  const newCards = cards.map((card: any, index: any) => {
    if (shuffledImages[index]) {
      return {
        ...card,
        image: shuffledImages[index],
      }
    }
    return card
  })

  return newCards
}
